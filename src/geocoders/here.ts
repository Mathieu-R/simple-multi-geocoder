// https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1geocode/get

import ky from "ky";
import countries from "i18n-iso-countries";

import {
  ForwardGeocodeOptions,
  GeocoderUnifiedResult,
  GeocodeType,
  ReverseGeocodeOptions,
} from "../types/common";
import { Feature, HereResponse } from "../types/geocoders/here";
import { providers } from "../providers";
import { createURLSearchParams, getSearchParamsObject } from "../utils";

export async function HereGeocode(
  type: GeocodeType,
  options: (ForwardGeocodeOptions | ReverseGeocodeOptions) & { raw: true },
): Promise<HereResponse>;
export async function HereGeocode(
  type: GeocodeType,
  options: (ForwardGeocodeOptions | ReverseGeocodeOptions) & { raw: false },
): Promise<GeocoderUnifiedResult[]>;
export async function HereGeocode(
  type: GeocodeType,
  options: ForwardGeocodeOptions | ReverseGeocodeOptions,
) {
  const url = providers.here.urls.geocode[type];
  const searchParamsObject = getSearchParamsObject(
    options,
    providers.here.options.geocode[type],
  );

  const response = await ky<HereResponse>(url, {
    searchParams: createURLSearchParams(searchParamsObject),
  }).json();

  if (options.raw) {
    return response;
  }

  return response.items.map((feature) => formatResult(feature));
}

export function formatResult(feature: Feature) {
  const { address, position, scoring, id } = feature;

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
      confidence:
        "queryScore" in scoring
          ? Number.parseFloat(scoring.queryScore.toFixed(2))
          : 0,
    },
  };

  return formatted;
}
