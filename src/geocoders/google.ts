// https://developers.google.com/maps/documentation/geocoding/requests-geocoding?hl=fr

import ky from "ky";
import {
  createURLSearchParams,
  getSearchParamsObject,
  snakeToCamel,
} from "../utils";
import { Feature, GoogleResponse } from "../types/geocoders/google";
import {
  ForwardGeocodeOptions,
  GeocoderUnifiedResult,
  GeocodeType,
  ReverseGeocodeOptions,
} from "../types/common";
import { providers } from "../providers";

type Components = {
  country?: string;
  countryCode?: string;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel2?: string;
  administrativeAreaLevel3?: string;
  locality?: string;
  postalTown?: string;
  postalCode?: string;
  route?: string;
  streetNumber?: string;
  [key: string]: unknown;
};

export async function GoogleGeocode(
  type: GeocodeType,
  options: ForwardGeocodeOptions | ReverseGeocodeOptions,
) {
  const url = providers.google.urls.geocode[type];
  const searchParamsObject = getSearchParamsObject(
    options,
    providers.google.options.geocode[type],
  );

  const response = await ky<GoogleResponse>(url, {
    searchParams: createURLSearchParams(searchParamsObject),
  }).json();

  if (options.raw) {
    return response;
  }

  return response.results.map((feature) => formatResult(feature));
}

function formatResult(feature: Feature) {
  const {
    address_components = [],
    formatted_address,
    geometry,
    partial_match,
  } = feature || {};

  const components: Components = address_components.reduce((acc, item) => {
    const { long_name, short_name, types } = item;

    types.forEach((_type) => {
      const type = snakeToCamel(_type);

      // if type is already found
      if (acc[type] || type === "political") {
        return;
      }

      if (type === "country") {
        acc[type] = long_name;
        acc["countryCode"] = short_name;
      }

      acc[type] = long_name;
    });

    return acc;
  }, {});

  const {
    country,
    countryCode,
    administrativeAreaLevel1,
    administrativeAreaLevel2,
    administrativeAreaLevel3,
    locality,
    postalTown,
    postalCode,
    route,
    streetNumber,
    ...extra
  } = components;

  extra.confidence = Number(!partial_match);

  const formatted: GeocoderUnifiedResult = {
    formattedAddress: formatted_address,
    latitude: geometry?.location?.lat,
    longitude: geometry?.location?.lng,
    components: {
      country,
      countryCode,
      state: administrativeAreaLevel1,
      region: administrativeAreaLevel2,
      district: administrativeAreaLevel3,
      city: locality || postalTown,
      zipCode: postalCode,
      streetName: route,
      streetNumber,
    },
    extra,
  };

  return formatted;
}
