import ky from "ky";
import {
  AutocompleteOptions,
  AutocompleteUnifiedResult,
} from "../types/common";
import { createURLSearchParams, getSearchParamsObject } from "../utils/fetch";
import { HereAutocompleteResponse, Item } from "../types/autocompleters/here";
import { providers } from "../providers";

export async function HereAutocomplete(options: AutocompleteOptions) {
  const url = providers.here.urls.autocomplete;
  const searchParams = getSearchParamsObject(
    options,
    providers.here.options.autocomplete,
  );

  const headers = new Headers();
  if (options.bearerToken) {
    headers.set("Authorization", `Bearer ${options.bearerToken}`);
  }

  const response = await ky<HereAutocompleteResponse>(url, {
    searchParams: createURLSearchParams(searchParams),
    headers,
  }).json();

  if (options.raw) {
    return response as any;
  }

  return response.items.map((item) => formatResult(item));
}

export function formatResult(result: Item) {
  return {
    formattedAddress: result.title,
    components: {
      streetNumber: result.address.houseNumber,
      streetName: result.address.street,
      zipCode: result.address.postalCode,
      city: result.address.city,
      state: result.address.state,
      district: result.address.district,
      building: result.address.building,
      country: result.address.countryName,
      countryCode: result.address.countryCode,
    },
    extra: {
      id: result.id,
    },
  } as AutocompleteUnifiedResult;
}
