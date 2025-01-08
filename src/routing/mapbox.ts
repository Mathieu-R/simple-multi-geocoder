import ky from "ky";
import { providers } from "../providers";
import {
  RoutingOptions,
  RoutingOptionsAugmented,
  RoutingUnifiedResult,
  TransportMode,
} from "../types/common";
import { getSearchParamsObject } from "../utils/fetch";

import { formatISO, parseISO, addSeconds } from "date-fns";
import { formatDistance, formatSecondsToHumanReadable } from "../utils/routing";
import { MapboxRoutingResponse, Route } from "../types/routing/mapbox";

const MAPBOX_TRANSPORT_MODE_MAPPING: Record<TransportMode, string> = {
  car: "driving",
  bicycle: "cycling",
  pedestrian: "walking",
};

export async function MapboxRouting(options: RoutingOptions) {
  const transportMode = MAPBOX_TRANSPORT_MODE_MAPPING[options.transportMode];
  let url = `${providers.mapbox.urls.routing}/${transportMode}`;

  if (options.transportMode === "car" && options.traffic) {
    url += "-traffic";
  }

  url += `/${options.markers.origin.coordinates.longitude},${options.markers.origin.coordinates.latitude};${options.markers.destination.coordinates.longitude},${options.markers.destination.coordinates.latitude}`;

  let optionsAugmented: RoutingOptionsAugmented = {
    credentials: options.credentials,
    alternatives: options.alternatives,
    params: options.params,
  };

  if (options.traffic) {
    if (options.markers.origin.time) {
      optionsAugmented = {
        ...optionsAugmented,
        departAt: options.markers.origin.time,
      };
    }
  }

  if (options.renderPath) {
    optionsAugmented = { ...optionsAugmented, geometries: "geojson" };
  }

  const response = await ky<MapboxRoutingResponse>(url, {
    searchParams: getSearchParamsObject(
      optionsAugmented,
      providers.mapbox.options.routing,
    ),
  }).json();

  if (options.raw) {
    return response as unknown;
  }

  if (response.code !== "Ok") {
    throw new Error("[ROUTING] Error computing route...");
  }

  return response.routes.map((route) => formatResult(route, options));
}

export function formatResult(result: Route, options: RoutingOptions) {
  return {
    departureTime: options.markers.origin.time ?? undefined,
    arrivalTime: options.markers.origin.time
      ? formatISO(
          addSeconds(parseISO(options.markers.origin.time), result.duration),
        )
      : undefined,
    distance: {
      value: result.distance,
      text: formatDistance(result.distance),
    },
    duration: {
      value: result.duration,
      text: formatSecondsToHumanReadable(result.duration, options.language),
    },
    // duration specified under typical traffic conditions
    // (dynamic traffic conditions not considered)
    typicalDuration: options.traffic
      ? {
          value: result.duration_typical,
          text: formatSecondsToHumanReadable(
            result.duration_typical,
            options.language,
          ),
        }
      : undefined,
    path: result.geometry ?? undefined,
  } as RoutingUnifiedResult;
}
