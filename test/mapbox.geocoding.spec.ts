import { describe, expect, test } from "vitest";
import { formatResult } from "../src/geocoders/mapbox";
import { apiForwardGeocodingResponse, apiReverseGeocodingResponse, expectedForwardGeocodingFormattedResult, expectedReverseGeocodingFormattedResult } from "./fixtures/mapbox.fixtures";

describe("MAPBOX", () => {
  test("format forward geocoding api response", () => {
    const results = apiForwardGeocodingResponse.features.map((response) =>
      formatResult(response),
    );
    expect(results).toMatchObject(expectedForwardGeocodingFormattedResult);
  });

  test("format reverse geocoding api response", () => {
    const results = apiReverseGeocodingResponse.features.map((response) =>
      formatResult(response),
    );
    expect(results).toMatchObject(expectedReverseGeocodingFormattedResult);
  });
});
