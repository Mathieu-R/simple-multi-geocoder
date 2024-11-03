import { describe, expect, test } from "vitest";
import { formatResult } from "../src/geocoders/mapbox";

import { apiResponse, expectedFormattedResult } from "./fixtures/mapbox.fixtures"

describe("", () => {
  test("", () => {
    const results = apiResponse.features.map(response => formatResult(response))
    expect(results).toMatchObject(expectedFormattedResult)
  })
})