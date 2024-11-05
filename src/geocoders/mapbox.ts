// https://docs.mapbox.com/api/search/geocoding/#forward-geocoding-with-search-text-input

import ky from "ky";

import {
  ForwardGeocodeOptions,
  GeocoderUnifiedResult,
  GeocodeType,
  Params,
  ReverseGeocodeOptions,
} from "../types/common";
import { Feature, MapboxResponse, MatchCode } from "../types/geocoders/mapbox";
import { createURLSearchParams, getSearchParamsObject } from "../utils/fetch";
import { providers } from "../providers";

export async function MapboxGeocode(
  type: GeocodeType,
  options: ForwardGeocodeOptions | ReverseGeocodeOptions,
) {
  const url = providers.mapbox.urls.geocode[type];
  const searchParamsObject = getSearchParamsObject(
    options,
    providers.mapbox.options.geocode[type],
  );

  const response = await ky<MapboxResponse>(url, {
    searchParams: createURLSearchParams(searchParamsObject),
  }).json();

  if (options.raw) {
    return response;
  }

  return response.features.map((feature) => formatResult(feature));
}

function isTrustable(matchCode: MatchCode) {
  return Number(
    matchCode.address_number === "matched" &&
      matchCode.street === "matched" &&
      matchCode.postcode === "matched" &&
      matchCode.country === "matched",
  );
}

export function formatResult(result: Feature) {
  const { properties, id } = result;
  const { context } = properties;

  const formatted: GeocoderUnifiedResult = {
    formattedAddress: properties.full_address,
    latitude: properties.coordinates.latitude,
    longitude: properties.coordinates.longitude,
    components: {
      streetNumber:
        properties.feature_type === "address"
          ? context.address?.address_number
          : undefined,
      streetName:
        properties.feature_type === "address"
          ? context.address?.street_name
          : undefined,
      zipCode: context.postcode?.name,
      state: context.region?.name,
      city: context.place?.name,
      district: context.district?.name,
      neighborhood: context.neighborhood?.name || context.locality?.name,
      country: context.country?.name,
      countryCode: context.country?.country_code,
    },
    extra: {
      id,
      bbox: properties.bbox ?? undefined,
      confidence: properties.match_code
        ? isTrustable(properties.match_code)
        : 0,
    },
  };

  return formatted;
}
