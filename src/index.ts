import { forward, reverse } from "./geocoders";
import { autocomplete } from "./autocompleters";
import { GeocoderUnifiedResult, AutocompleteUnifiedResult } from './types/common';

const geocode = {
  forward,
  reverse,
};

export { geocode, autocomplete };
export default { geocode, autocomplete };

export type {
  GeocoderUnifiedResult,
  AutocompleteUnifiedResult
}
