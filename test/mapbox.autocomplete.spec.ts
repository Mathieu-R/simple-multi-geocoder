import { expect, test } from "vitest";
import { formatResult } from "../src/autocompleters/mapbox";
import {
  apiAutocompleteResponse,
  expectedForwardGeocodingFormattedResult,
} from "./fixtures/mapbox.fixtures";

test("format autocomplete api response", () => {
  const results = apiAutocompleteResponse.suggestions.map((response) =>
    // @ts-expect-error
    formatResult(response),
  );

  expect(results).toMatchObject(expectedForwardGeocodingFormattedResult);
});
