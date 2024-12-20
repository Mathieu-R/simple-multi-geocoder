import ky from "ky";
import { providers } from "../providers";
import { GeocoderUnifiedResult, LookupOptions } from "../types/common";
import { getSearchParamsObject } from "../utils/fetch";
import countries from 'i18n-iso-countries';

export async function HereLookup(options: LookupOptions) {
  const url = providers.here.urls.lookup;
  const searchParams = getSearchParamsObject(
    options,
    providers.here.options.lookup,
  );

  const headers = new Headers();
  if (options.bearerToken) {
    headers.set("Authorization", `Bearer ${options.bearerToken}`);
  }

  const response = await ky<any>(url, {
    searchParams,
    headers,
  }).json();

  if (options.raw) {
    return response as unknown;
  }

  return formatResult(response)
}
export function formatResult(feature: any) {
  const { address, position, id } = feature;

  const formatted: GeocoderUnifiedResult = {
    formattedAddress: address.label,
    latitude: position.lat,
    longitude: position.lng,
    components: {
      streetNumber: address.houseNumber,
      streetName: address.street,
      zipCode: address.postalCode,
      state: address.state,
      city: address.city,
      county: address.county,
      district: address.district,
      country: address.countryName,
      countryCode: countries.alpha3ToAlpha2(address.countryCode),
      building: address.building,
    },
    extra: {
      id,
      confidence: 1
    },
  };

  return formatted;
}
