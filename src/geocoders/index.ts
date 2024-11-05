import { Provider } from "../providers";
import {
  ForwardGeocodeOptions,
  GeocoderUnifiedResult,
  GeocodeType,
  ReverseGeocodeOptions,
} from "../types/common";
import { GoogleGeocode } from "./google";
import { HereGeocode } from "./here";
import { MapboxGeocode } from "./mapbox";



async function geocode(
  type: GeocodeType,
  provider: `${Provider}`,
  options: ForwardGeocodeOptions | ReverseGeocodeOptions,
) {
  options.raw = options.raw || false;

  if (provider === Provider.GOOGLE) {
    return GoogleGeocode(type, options);
  }

  if (provider === Provider.HERE) {
    return HereGeocode(type, options);
  }

  if (provider === Provider.MAPBOX) {
    return MapboxGeocode(type, options);
  }

  throw new Error(`Provider "${provider}" not implemented...`);
}

export async function forward(
  provider: `${Provider}`,
  options: ForwardGeocodeOptions & { raw: true },
): Promise<unknown>;
export async function forward(
  provider: `${Provider}`,
  options: ForwardGeocodeOptions & { raw: false },
): Promise<GeocoderUnifiedResult[]>;
export async function forward(
  provider: `${Provider}`,
  options: Omit<ForwardGeocodeOptions, "raw">,
): Promise<GeocoderUnifiedResult[]>;
export async function forward(
  provider: `${Provider}`,
  options: ForwardGeocodeOptions,
): Promise<unknown | GeocoderUnifiedResult[]>;
export async function forward(
  provider: `${Provider}`,
  options: ForwardGeocodeOptions,
) {
  return geocode("forward", provider, options);
}

export async function reverse(
  provider: `${Provider}`,
  options: ReverseGeocodeOptions & { raw: true },
): Promise<unknown>;
export async function reverse(
  provider: `${Provider}`,
  options: ReverseGeocodeOptions & { raw: false },
): Promise<GeocoderUnifiedResult[]>;
export async function reverse(
  provider: `${Provider}`,
  options: Omit<ReverseGeocodeOptions, "raw">,
): Promise<GeocoderUnifiedResult[]>;
export async function reverse(
  provider: `${Provider}`,
  options: ReverseGeocodeOptions,
): Promise<unknown | GeocoderUnifiedResult[]>;
export async function reverse(
  provider: `${Provider}`,
  options: ReverseGeocodeOptions,
) {
  return geocode("reverse", provider, options);
}
