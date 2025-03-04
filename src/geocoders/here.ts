// https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1geocode/get

import ky from "ky";
import countries from "i18n-iso-countries";

import {
  ForwardGeocodeOptions,
  GeocoderUnifiedResult,
  GeocodeType,
  ReverseGeocodeOptions,
  StructuredAddress,
} from "../types/common";
import { Feature, HereResponse } from "../types/geocoders/here";
import { providers } from "../providers";
import { createURLSearchParams, getSearchParamsObject } from "../utils/fetch";

export async function HereGeocode(
  type: GeocodeType,
  options: ForwardGeocodeOptions | ReverseGeocodeOptions,
) {
  const url = providers.here.urls.geocode[type];
  const searchParamsObject = getSearchParamsObject(
    options,
    providers.here.options.geocode[type],
  );

  if (options.address) {
    searchParamsObject.qq = formatStructuredQuery(options.address);
    delete searchParamsObject.q;
  }

  const headers = new Headers();

  if (options.credentials.bearerToken) {
    headers.set("Authorization", `Bearer ${options.credentials.bearerToken}`);
  }

  const response = await ky<HereResponse>(url, {
    searchParams: createURLSearchParams(searchParamsObject),
    headers,
  }).json();

  if (options.raw) {
    return response as any;
  }

  return response.items.map((feature) => formatResult(feature));
}

const toFixed = (value?: number) =>
  value ? Number.parseFloat(value.toFixed(2)) : undefined;

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
      confidenceFields: {
        streetNumber: toFixed(scoring.fieldScore?.houseNumber),
        streetName: scoring.fieldScore?.streets
          ?.map(toFixed)
          // Find the lowest score
          .reduce((a, b) => Math.min(a, b), 1),
        zipCode: toFixed(scoring.fieldScore?.postalCode),
        state: toFixed(scoring.fieldScore?.state),
        city: toFixed(scoring.fieldScore?.city),
        county: toFixed(scoring.fieldScore?.county),
        district: toFixed(scoring.fieldScore?.district),
        country: toFixed(scoring.fieldScore?.country),
        countryCode: toFixed(scoring.fieldScore?.countryCode),
        building: toFixed(scoring.fieldScore?.building),
      },
    },
  };

  return formatted;
}

function formatStructuredQuery(address: StructuredAddress) {
  const fields = {
    country: address.countryCode,
    city: address.city,
    street: address.street,
    houseNumber: address.number,
    postalCode:  address.zip
  }
  return Object.entries(fields)
    .map(([key, value]) => `${key}=${value}`)
    .join(";");

}
