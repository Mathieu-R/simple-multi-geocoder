import { describe, expect, test } from "vitest";
import { formatResult } from "../src/geocoders/here";

import { apiResponse, expectedFormattedResult } from "./fixtures/here.fixtures"

describe("", () => {
  test("", () => {
    // @ts-expect-error
    const results = apiResponse.items.map(response => formatResult(response))
    expect(results).toMatchObject(expectedFormattedResult)
  })
})