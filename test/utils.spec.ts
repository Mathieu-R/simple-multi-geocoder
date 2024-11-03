import { describe, test, expect } from "vitest";
import { ForwardGeocodeOptions, ReverseGeocodeOptions } from '../src/types/common';
import { getSearchParamsObject, snakeToCamel } from '../src/utils';
import { providers } from "../src/providers";

describe("search params", () => {
  const fakeApiKey = "123";
  const address = "Rue du Belvédère 23, 1050 Ixelles, Belgique";
  const language = "fr";
  const country = "BE";
  const limit = 3;
  const otherParams = {
    otherParam: "test",
  };

  const coordinates = {
    latitude: 50.82679,
    longitude: 4.37359,
  };

  describe("map parameters to provider query string", () => {
    test("should work as expected and apply template function if provided", () => {
      const options: ForwardGeocodeOptions = {
        apiKey: fakeApiKey,
        query: address,
        language,
        country,
        limit,
        params: otherParams
      };

      const searchParamsObject = getSearchParamsObject(
        options,
        providers.here.options.geocode.forward,
      );

      expect(searchParamsObject).toStrictEqual({
        apiKey: fakeApiKey,
        q: address,
        language: language,
        components: "countryCode:BEL",
        limit: limit,
        otherParam: "test"
      })
    })

    test("should work even if some optional parameters are not set", () => {
      const options: ForwardGeocodeOptions = {
        apiKey: fakeApiKey,
        query: address
      };

      const searchParamsObject = getSearchParamsObject(
        options,
        providers.here.options.geocode.forward,
      );

      expect(searchParamsObject).toStrictEqual({
        apiKey: fakeApiKey,
        q: address,
        limit: 1
      });
    });

    test("should not return in the object parameters that are not supported by the provider", () => {
      const options: ForwardGeocodeOptions = {
        apiKey: fakeApiKey,
        query: address,
        limit: 3
      };

      const searchParamsObject = getSearchParamsObject(
        options,
        providers.google.options.geocode.forward,
      );

      expect(searchParamsObject).toStrictEqual({
        key: fakeApiKey,
        address: address,
      });
    });

    test("should work with nested parameters", () => {
      const options: ReverseGeocodeOptions = {
        apiKey: fakeApiKey,
        coordinates,
        language,
        country,
        limit,
        params: otherParams,
      };

      const searchParamsObject = getSearchParamsObject(
        options,
        providers.mapbox.options.geocode.reverse,
      );

      expect(searchParamsObject).toStrictEqual({
        access_token: fakeApiKey,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        language: language,
        country: country,
        limit: limit,
        otherParam: "test",
      });
    });
  })
})

describe("snake to camel", () => {
  test("should convert snake_case string to camelCase", () => {
    const snakeCaseString = "snake_case"
    expect(snakeToCamel(snakeCaseString)).toBe("snakeCase")
  })
})
