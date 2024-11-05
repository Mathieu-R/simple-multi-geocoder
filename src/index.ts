import { forward, reverse } from "./geocoders";
import { autocomplete } from "./autocompleters";
import { routing } from "./routing"
import { GeocoderUnifiedResult, AutocompleteUnifiedResult, RoutingUnifiedResult } from './types/common';

const geocode = {
  forward,
  reverse,
};

export { geocode, autocomplete, routing };
export default { geocode, autocomplete, routing };

export type {
  GeocoderUnifiedResult,
  AutocompleteUnifiedResult,
  RoutingUnifiedResult
}
