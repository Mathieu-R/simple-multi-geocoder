import {
  intervalToDuration,
  formatDuration,
} from "date-fns";
import { getLocaleFromLanguage } from "./helpers";

export async function polylineToGeoJSON(polyline: string) {
  const mbPolyline = await import("@mapbox/polyline");
  return mbPolyline.toGeoJSON(polyline);
}

export function formatDistance(distance: number) {
  return `${(distance / 1000).toFixed(2)}km`;
}

export function secondsToDuration(seconds: number) {
  const epoch = new Date(0);
  const secondsAfterEpoch = new Date(seconds * 1000);
  return intervalToDuration({
    start: epoch,
    end: secondsAfterEpoch,
  });
}

export function formatSecondsToHumanReadable(seconds: number, language?: string): string {
  return formatDuration(secondsToDuration(seconds), {
    format: ["hours", "minutes", "seconds"],
    locale: getLocaleFromLanguage(language),
  });
}
