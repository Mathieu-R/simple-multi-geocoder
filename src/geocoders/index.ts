import { Provider } from "../providers";
import { ForwardGeocodeOptions, GeocodeType, ReverseGeocodeOptions } from "../types/common";
import { GoogleGeocode } from "./google";
import { HereGeocode } from "./here";
import { MapboxGeocode } from "./mapbox";

async function geocode(
	type: GeocodeType,
	provider: Provider,
	options: ForwardGeocodeOptions | ReverseGeocodeOptions
) {
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
	provider: Provider,
	options: ForwardGeocodeOptions
) {
  return geocode("forward", provider, options)
}

export async function reverse(
  provider: Provider, 
  options: ReverseGeocodeOptions
) {
  return geocode("reverse", provider, options);
}