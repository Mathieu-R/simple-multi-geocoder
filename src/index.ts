import { forward, reverse } from "./geocoders";
import { autocomplete } from "./autocompleters";
import { routing } from "./routing"
import { lookup } from "./lookup";
import {
  GeocoderUnifiedResult,
  AutocompleteUnifiedResult,
  RoutingUnifiedResult,
  StructuredAddress,
} from "./types/common";
import { getHereOauthToken } from "./utils/here";

const geocode = {
  forward,
  reverse,
};

export { geocode, autocomplete, routing, lookup, getHereOauthToken };
export default { geocode, autocomplete, routing, lookup };

export type {
  GeocoderUnifiedResult,
  AutocompleteUnifiedResult,
  RoutingUnifiedResult,
  StructuredAddress,
}
