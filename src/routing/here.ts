import ky from "ky";
import { providers } from "../providers";
import {
  RoutingOptions,
  RoutingOptionsAugmented,
  RoutingUnifiedResult,
} from "../types/common";
import { getSearchParamsObject } from "../utils/fetch";
import {
  formatDistance,
  formatSecondsToHumanReadable,
  polylineToGeoJSON,
} from "../utils/routing";
import { HereRoutingResponse, Route } from "../types/routing/here";

export async function HereRouting(
  options: RoutingOptions & { raw: true },
): Promise<HereRoutingResponse>;
export async function HereRouting(
  options: RoutingOptions & { raw: false },
): Promise<RoutingUnifiedResult[]>;
export async function HereRouting(
  options: RoutingOptions,
): Promise<HereRoutingResponse | RoutingUnifiedResult[]>;
export async function HereRouting(options: RoutingOptions) {
  const url = providers.here.urls.routing;
  let optionsAugmented: RoutingOptionsAugmented = {
    apiKey: options.apiKey,
    origin: options.markers.origin.coordinates,
    destination: options.markers.destination.coordinates,
    transportMode: options.transportMode,
    alternatives: options.alternatives,
    renderPath: options.renderPath,
    params: options.params,
  };

  if (options.traffic) {
    // need ISO 8601
    // https://www.here.com/docs/bundle/routing-api-developer-guide-v8/page/tutorials/route-start-end-time.html
    if (options.markers.origin.time) {
      optionsAugmented = {
        ...optionsAugmented,
        departAt: options.markers.origin.time,
      };
    }

    if (options.markers.destination.time) {
      optionsAugmented = {
        ...optionsAugmented,
        arriveAt: options.markers.destination.time,
      };
    }
  }

  const response = await ky<HereRoutingResponse>(url, {
    searchParams: getSearchParamsObject(
      optionsAugmented,
      providers.here.options.routing,
    ),
  }).json();

  if (options.raw) {
    return response;
  }

  return Promise.all(response.routes.map((route) => formatResult(route)));
}

export async function formatResult(result: Route) {
  // route.sections is an ordered list of vehicle, transit and pedestrians sections
  // making up the route
  // in our case, we should only have one section
  const item = result.sections[0];
  return {
    departureTime: item.departure.time,
    arrivalTime: item.arrival.time,
    distance: {
      value: item.travelSummary.length,
      text: formatDistance(item.travelSummary.length),
    },
    duration: {
      value: item.travelSummary.duration,
      text: formatSecondsToHumanReadable(item.travelSummary.duration),
    },
    // duration specified under typical traffic conditions
    // (dynamic traffic conditions not considered)
    typicalDuration: {
      value: item.travelSummary.typicalDuration,
      text: formatSecondsToHumanReadable(item.travelSummary.duration),
    },
    path: item.polyline ? await polylineToGeoJSON(item.polyline) : undefined,
  } as RoutingUnifiedResult;
}
