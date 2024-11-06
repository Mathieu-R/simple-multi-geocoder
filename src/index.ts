import { forward, reverse } from "./geocoders";
import { autocomplete } from "./autocompleters";
import { routing } from "./routing"
import { lookup } from "./lookup";
import { GeocoderUnifiedResult, AutocompleteUnifiedResult, RoutingUnifiedResult } from './types/common';

const geocode = {
  forward,
  reverse,
};

export { geocode, autocomplete, routing, lookup };
export default { geocode, autocomplete, routing, lookup };

export type {
  GeocoderUnifiedResult,
  AutocompleteUnifiedResult,
  RoutingUnifiedResult
}
