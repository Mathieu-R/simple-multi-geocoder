import { Provider } from "../providers";
import { RoutingOptions } from "../types/common";
import { HereRouting } from "./here";
import { MapboxRouting } from "./mapbox";

export async function routing(
  provider: `${Provider}`,
  options: RoutingOptions,
) {
  if (provider === Provider.HERE) {
    return HereRouting(options);
  }

  if (provider === Provider.MAPBOX) {
    return MapboxRouting(options);
  }

  throw new Error(`Provider "${provider}" is not supported...`);
}
