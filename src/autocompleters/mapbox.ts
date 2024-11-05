import ky from "ky";
import {
  MapboxAutocompleteResponse,
  Suggestion,
} from "../types/autocompleters/mapbox";
import { providers } from "../providers";
import {
  AutocompleteOptions,
  AutocompleteUnifiedResult,
} from "../types/common";
import { createURLSearchParams, getSearchParamsObject } from "../utils";

export async function MapboxAutocomplete(
  options: AutocompleteOptions & { raw: true },
): Promise<MapboxAutocompleteResponse>;
export async function MapboxAutocomplete(
  options: AutocompleteOptions & { raw: false },
): Promise<AutocompleteUnifiedResult[]>;
export async function MapboxAutocomplete(
  options: AutocompleteOptions,
): Promise<MapboxAutocompleteResponse | AutocompleteUnifiedResult[]>;
export async function MapboxAutocomplete(options: AutocompleteOptions) {
  const url = providers.mapbox.urls.autocomplete;
  const searchParams = getSearchParamsObject(
    options,
    providers.mapbox.options.autocomplete,
  );

  const response = await ky<MapboxAutocompleteResponse>(url, {
    searchParams: createURLSearchParams(searchParams),
  }).json();

  if (options.raw) {
    return response;
  }

  return response.suggestions.map((item) => formatResult(item));
}

export function formatResult(result: Suggestion) {
  return {
    formattedAddress:
      result.full_address ||
      result.address ||
      `${result.name} ${result.place_formatted}`,
    components: {
      streetNumber: result.context.address?.address_number,
      streetName: result.context.street?.name,
      zipCode: result.context.postcode?.name,
      city: result.context.place?.name,
      region: result.context.region?.name,
      country: result.context.country?.name,
      countryCode: result.context.country?.country_code,
    },
    extra: {
      id: result.mapbox_id,
    },
  } as AutocompleteUnifiedResult;
}
