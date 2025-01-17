import ky from "ky";
import { createURLSearchParams, getSearchParamsObject } from "../utils/fetch";
import {
  AutocompleteOptions,
  AutocompleteUnifiedResult,
} from "../types/common";
import {
  GoogleAutocompleteResponse,
  Prediction,
} from "../types/autocompleters/google";
import { providers } from "../providers";

export async function GoogleAutocomplete(options: AutocompleteOptions) {
  const url = providers.google.urls.autocomplete;
  const searchParams = getSearchParamsObject(
    options,
    providers.google.options.autocomplete,
  );
  const response = await ky<GoogleAutocompleteResponse>(url, {
    searchParams: createURLSearchParams(searchParams),
  }).json();

  if (options.raw) {
    return response as any;
  }

  return response.predictions.map((item) => formatResult(item));
}

export function formatResult(result: Prediction) {
  return {
    formattedAddress: result.structured_formatting.main_text,
    extra: {
      id: result.place_id,
    },
  } as AutocompleteUnifiedResult;
}
