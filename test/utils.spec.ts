import { describe, test, expect } from "vitest";
import {
  ForwardGeocodeOptions,
  ReverseGeocodeOptions,
} from "../src/types/common";
import { getSearchParamsObject } from "../src/utils/fetch";
import { snakeToCamel } from "../src/utils/helpers";
import { providers } from "../src/providers";
import {
  formatSecondsToHumanReadable,
  secondsToDuration,
} from "../src/utils/routing";

describe("search params", () => {
  const fakeApiKey = "123";
  const address = "Rue du Belvédère 23, 1050 Ixelles, Belgique";
  const language = "fr";
  const countryCode = "BE";
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
        credentials: {
          apiKey: fakeApiKey,
        },
        query: address,
        language,
        countryCode,
        limit,
        params: otherParams,
      };

      const searchParamsObject = getSearchParamsObject(
        options,
        providers.here.options.geocode.forward,
      );

      expect(searchParamsObject).toStrictEqual({
        apiKey: fakeApiKey,
        q: address,
        lang: language,
        in: "countryCode:BEL",
        limit: limit,
        otherParam: "test",
      });
    });

    test("should work even if some optional parameters are not set", () => {
      const options: ForwardGeocodeOptions = {
        credentials: {
          apiKey: fakeApiKey,
        },
        query: address,
      };

      const searchParamsObject = getSearchParamsObject(
        options,
        providers.here.options.geocode.forward,
      );

      expect(searchParamsObject).toStrictEqual({
        apiKey: fakeApiKey,
        q: address,
        limit: 1,
      });
    });

    test("should not return in the object parameters that are not supported by the provider", () => {
      const options: ForwardGeocodeOptions = {
        credentials: {
          apiKey: fakeApiKey,
        },
        query: address,
        limit: 3,
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
        credentials: {
          apiKey: fakeApiKey,
        },
        coordinates,
        language,
        countryCode,
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
        country: countryCode,
        limit: limit,
        otherParam: "test",
      });
    });
  });
});

describe("snake to camel", () => {
  test("should convert snake_case string to camelCase", () => {
    const snakeCaseString = "snake_case";
    expect(snakeToCamel(snakeCaseString)).toBe("snakeCase");
  });
});

describe("duration", () => {
  test("should return time travel in human readable format (default: en)", () => {
    // duration in seconds
    let duration = 90;

    expect(secondsToDuration(duration)).toStrictEqual({
      minutes: 1,
      seconds: 30,
    });

    expect(formatSecondsToHumanReadable(duration)).toBe("1 minute");

    duration = 30;
    expect(secondsToDuration(duration)).toStrictEqual({
      seconds: 30,
    });

    expect(formatSecondsToHumanReadable(duration)).toBe("");
  });

  test("should return time travel in human readable format (nl)", () => {
    // duration in seconds
    let duration = 180;
    expect(formatSecondsToHumanReadable(duration, 'nl')).toBe("3 minuten");

    duration = 30;
    expect(formatSecondsToHumanReadable(duration, 'nl')).toBe("");
  });
});
