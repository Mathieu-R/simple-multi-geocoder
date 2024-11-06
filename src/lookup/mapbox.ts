import ky from "ky";
import { providers } from "../providers";
import { GeocoderUnifiedResult, LookupOptions } from "../types/common";
import { getSearchParamsObject } from "../utils/fetch";

export async function MapboxLookup(
  options: LookupOptions
) {
  const url = providers.mapbox.urls.routing
  const searchParams = getSearchParamsObject(options, providers.mapbox.options.routing)

  const response = await ky<any>(`${url}/${options.id}`, {
    searchParams
  }).json()

  if (options.raw) {
    return response as unknown
  }

  return formatResult(response.features[0]);
}

export function formatResult(result: any) {
  const { properties, mapbox_id } = result;
  const { context } = properties;

  const formatted: GeocoderUnifiedResult = {
    formattedAddress: properties.full_address,
    latitude: properties.coordinates.latitude,
    longitude: properties.coordinates.longitude,
    components: {
      streetNumber:
        properties.feature_type === "address"
          ? context.address?.address_number
          : undefined,
      streetName:
        properties.feature_type === "address"
          ? context.address?.street_name
          : undefined,
      zipCode: context.postcode?.name,
      state: context.region?.name,
      city: context.place?.name,
      district: context.district?.name,
      neighborhood: context.neighborhood?.name || context.locality?.name,
      country: context.country?.name,
      countryCode: context.country?.country_code,
    },
    extra: {
      id: mapbox_id,
      bbox: properties.bbox ?? undefined,
      confidence: 1,
    },
  };

  return formatted;
}
