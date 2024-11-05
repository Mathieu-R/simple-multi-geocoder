import {
  intervalToDuration,
  formatDuration,
} from "date-fns";

export async function polylineToGeoJSON(polyline: string) {
  const mbPolyline = await import("@mapbox/polyline");
  return mbPolyline.toGeoJSON(polyline);
}

export function formatDistance(distance: number) {
  if (distance < 1000) {
    return `${distance}m`;
  }

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

export function formatSecondsToHumanReadable(seconds: number): string {
  return formatDuration(secondsToDuration(seconds), {
    format: ["hours", "minutes"],
  });
}
