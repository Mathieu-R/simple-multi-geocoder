import countries from "i18n-iso-countries";
import { Coordinates, OptionMapping, ProvidersConfig } from "./types/common";

export enum Provider {
  GOOGLE = "google",
  HERE = "here",
  MAPBOX = "mapbox",
}

const COMMON_GOOGLE_OPTIONS: OptionMapping[] = [
  {
    option: "apiKey",
    mappedParam: "key",
  },
  {
    option: "language",
    mappedParam: "language",
  },
  {
    option: "countryCode",
    mappedParam: "region",
  },
];

const COMMON_HERE_OPTIONS: OptionMapping[] = [
  {
    option: "apiKey",
    mappedParam: "apiKey",
  },
  {
    option: "language",
    mappedParam: "lang",
  },
  {
    // Note: make sure you pass the country code in ISO 3166-1 alpha-2 format (BE, FR, NL,...)
    option: "countryCode",
    mappedParam: "in",
    // alpha-3 ISO code with `countryCode:<alpha-3 ISO code>`
    templateFn: (countryCodeAlpha2: string) =>
      `countryCode:${countries.alpha2ToAlpha3(countryCodeAlpha2)}`,
  },
  {
    option: "limit",
    mappedParam: "limit",
  },
];

const COMMON_MAPBOX_OPTIONS: OptionMapping[] = [
  {
    option: "apiKey",
    mappedParam: "access_token",
  },
  {
    option: "language",
    mappedParam: "language",
  },
  {
    option: "countryCode",
    mappedParam: "country",
  },
  {
    option: "limit",
    mappedParam: "limit",
  },
];

export const providers: ProvidersConfig = {
  google: {
    urls: {
      geocode: {
        forward: "https://maps.googleapis.com/maps/api/geocode/json",
        reverse: "https://maps.googleapis.com/maps/api/geocode/json",
      },
      autocomplete:
        "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      routing: "",
      lookup: ""
    },
    options: {
      geocode: {
        forward: [
          ...COMMON_GOOGLE_OPTIONS,
          {
            option: "query",
            mappedParam: "address",
          },
        ],
        reverse: [
          ...COMMON_GOOGLE_OPTIONS,
          {
            option: "coordinates",
            mappedParam: "latlng",
            templateFn: (coordinates: Coordinates) =>
              `${coordinates.latitude},${coordinates.longitude}`,
          },
        ],
      },
      autocomplete: [
        ...COMMON_GOOGLE_OPTIONS,
        {
          option: "query",
          mappedParam: "address",
        },
        {
          option: "sessionToken",
          mappedParam: "sessiontoken",
        },
      ],
      routing: [],
      lookup: []
    },
  },
  here: {
    urls: {
      geocode: {
        forward: "https://geocode.search.hereapi.com/v1/geocode",
        reverse: "https://reverse.search.hereapi.com/v1/geocode",
      },
      autocomplete: "https://autocomplete.search.hereapi.com/v1/autocomplete",
      routing: "https://router.hereapi.com/v8/routes",
      lookup: "https://lookup.search.hereapi.com/v1/lookup",
    },
    options: {
      geocode: {
        forward: [
          ...COMMON_HERE_OPTIONS,
          {
            option: "query",
            mappedParam: "q",
          },
        ],
        reverse: [
          ...COMMON_HERE_OPTIONS,
          {
            option: "coordinates",
            mappedParam: "at",
            templateFn: (coordinates: Coordinates) =>
              `${coordinates.latitude},${coordinates.longitude}`,
          },
        ],
      },
      autocomplete: [
        ...COMMON_HERE_OPTIONS,
        {
          option: "query",
          mappedParam: "q",
        },
      ],
      routing: [
        {
          option: "apiKey",
          mappedParam: "apiKey",
        },
        {
          option: "origin",
          mappedParam: "origin",
          templateFn: (coordinates: Coordinates) =>
            `${coordinates.latitude},${coordinates.longitude}`,
        },
        {
          option: "destination",
          mappedParam: "destination",
          templateFn: (coordinates: Coordinates) =>
            `${coordinates.latitude},${coordinates.longitude}`,
        },
        {
          option: "departAt",
          mappedParam: "departureTime",
        },
        {
          option: "arriveAt",
          mappedParam: "arrivalTime",
        },
        {
          option: "transportMode",
          mappedParam: "transportMode",
        },
        {
          option: "alternatives",
          mappedParam: "alternatives",
          // we look for 2 alternative paths if alternatives = true
          templateFn: (alternatives: boolean) => (alternatives ? "2" : "0"),
        },
        {
          option: "return",
          mappedParam: "renderPath",
          templateFn: (renderPath: boolean) =>
            renderPath
              ? ["polyline", "travelSummary"].join(",")
              : "travelSummary",
        },
      ],
      lookup: [
        {
          option: "apiKey",
          mappedParam: "apiKey",
        },
        {
          option: "id",
          mappedParam: "id",
        },
        {
          option: "language",
          mappedParam: "lang",
        },
      ],
    },
  },
  mapbox: {
    urls: {
      geocode: {
        forward: "https://api.mapbox.com/search/geocode/v6/forward",
        reverse: "https://api.mapbox.com/search/geocode/v6/reverse",
      },
      autocomplete: "https://api.mapbox.com/search/searchbox/v1/suggest",
      routing: "https://api.mapbox.com/directions/v5/mapbox",
      lookup: "https://api.mapbox.com/search/searchbox/v1/retrieve",
    },
    options: {
      geocode: {
        forward: [
          ...COMMON_MAPBOX_OPTIONS,
          {
            option: "query",
            mappedParam: "q",
          },
        ],
        reverse: [
          ...COMMON_MAPBOX_OPTIONS,
          {
            option: "coordinates",
            mappedParam: [
              {
                option: "latitude",
                mappedParam: "latitude",
              },
              {
                option: "longitude",
                mappedParam: "longitude",
              },
            ],
          },
        ],
      },
      autocomplete: [
        ...COMMON_MAPBOX_OPTIONS,
        {
          option: "query",
          mappedParam: "q",
        },
        {
          option: "sessionToken",
          mappedParam: "session_token",
        },
      ],
      routing: [
        {
          option: "apiKey",
          mappedParam: "access_token",
        },
        {
          option: "alternatives",
          mappedParam: "alternatives",
        },
        {
          option: "departAt",
          mappedParam: "depart_at",
        },
        {
          option: "geometries",
          mappedParam: "geometries",
        },
      ],
      lookup: [
        {
          option: "apiKey",
          mappedParam: "access_token",
        },
        {
          option: "sessionToken",
          mappedParam: "session_token",
        },
        {
          option: "language",
          mappedParam: "language",
        },
      ],
    },
  },
};
