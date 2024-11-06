import { v4 as uuidv4 } from "uuid";
import { Provider } from "../providers";
import { GeocoderUnifiedResult, LookupOptions } from "../types/common";
import { HereLookup } from "./here";
import { MapboxLookup } from "./mapbox";

export async function lookup(
  provider: `${Provider}`,
  options: LookupOptions & { raw: true },
): Promise<unknown>;
export async function lookup(
  provider: `${Provider}`,
  options: LookupOptions & { raw: false },
): Promise<GeocoderUnifiedResult>;
export async function lookup(
  provider: `${Provider}`,
  options: Omit<LookupOptions, "raw">,
): Promise<GeocoderUnifiedResult>;
export async function lookup(
  provider: `${Provider}`,
  options: LookupOptions,
): Promise<unknown | GeocoderUnifiedResult>;
export async function lookup(provider: `${Provider}`, options: LookupOptions) {
  options.raw = options.raw || false;

  if (!options.sessionToken) {
    options.sessionToken = uuidv4();
  }

  if (provider === Provider.HERE) {
    return HereLookup(options);
  }

  if (provider === Provider.MAPBOX) {
    return MapboxLookup(options);
  }

  throw new Error(`Provider "${provider}" not implemented...`);
}
