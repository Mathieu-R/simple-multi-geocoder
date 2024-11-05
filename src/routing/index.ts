import { Provider } from "../providers";
import { RoutingOptions, RoutingUnifiedResult, TransportMode } from "../types/common";
import { HereRouting } from "./here";
import { MapboxRouting } from "./mapbox";

const DEFAULT_OPTIONS = {
  transportMode: "car" as TransportMode,
  alternatives: false,
  traffic: false,
  renderPath: false,
  raw: false
};

export async function routing(
  provider: `${Provider}`,
  options: RoutingOptions & { raw: true },
): Promise<unknown>;
export async function routing(
  provider: `${Provider}`,
  options: RoutingOptions & { raw: false },
): Promise<RoutingUnifiedResult[]>;
export async function routing(
  provider: `${Provider}`,
  options: Omit<RoutingOptions, "raw">,
): Promise<RoutingUnifiedResult[]>;
export async function routing(
  provider: `${Provider}`,
  options: RoutingOptions,
): Promise<unknown | RoutingUnifiedResult[]>;
export async function routing(
  provider: `${Provider}`,
  options: RoutingOptions,
) {
  options = {...DEFAULT_OPTIONS, ...options}

  if (provider === Provider.HERE) {
    return HereRouting(options);
  }

  if (provider === Provider.MAPBOX) {
    return MapboxRouting(options);
  }

  throw new Error(`Provider "${provider}" is not supported...`);
}
