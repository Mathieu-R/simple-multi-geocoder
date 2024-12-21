import { describe, expect, test } from "vitest";
import { formatResult } from "../src/geocoders/here";

import { expectedGeocodingFormattedResult } from "./fixtures/here.fixtures";

describe("HERE", () => {
  test("format forward geocoding api results", () => {
    // @ts-expect-error
    const results = apiResponse.items.map((response) => formatResult(response));
    expect(results).toMatchObject(expectedGeocodingFormattedResult);
  });
});
