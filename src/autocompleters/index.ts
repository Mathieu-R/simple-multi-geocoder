import { v4 as uuidv4 } from "uuid";
import { Provider } from "../providers";
import { GoogleAutocomplete } from "./google";
import { HereAutocomplete } from "./here";
import { MapboxAutocomplete } from "./mapbox";
import { AutocompleteOptions, AutocompleteUnifiedResult } from "../types/common";

export async function autocomplete(
  provider: `${Provider}`,
  options: AutocompleteOptions & { raw: true },
): Promise<unknown>;
export async function autocomplete(
  provider: `${Provider}`,
  options: AutocompleteOptions & { raw: false },
): Promise<AutocompleteUnifiedResult[]>;
export async function autocomplete(
  provider: `${Provider}`,
  options: Omit<AutocompleteOptions, "raw">,
): Promise<AutocompleteUnifiedResult[]>;
export async function autocomplete(
  provider: `${Provider}`,
  options: AutocompleteOptions,
): Promise<unknown | AutocompleteUnifiedResult[]>;
export async function autocomplete(
  provider: `${Provider}`,
  options: AutocompleteOptions,
) {
  options.raw = options.raw || false

  if (!options.sessionToken) {
    options.sessionToken = uuidv4();
  }

  if (provider === Provider.GOOGLE) {
    return GoogleAutocomplete(options);
  }

  if (provider === Provider.HERE) {
    return HereAutocomplete(options);
  }

  if (provider === Provider.MAPBOX) {
    return MapboxAutocomplete(options);
  }

  throw new Error(`Provider "${provider}" is not supported...`);
}
