import { Provider } from "../providers";

export type Params = Record<string, string | number | boolean>;

export type GeocodeType = "forward" | "reverse";
export type TransportMode = "car" | "bicycle" | "pedestrian";

export type RoutingMarkers = {
  origin: {
    // ISO 8601
    time?: string;
    coordinates: Coordinates;
  };
  destination: {
    // ISO 8601
    time?: string;
    coordinates: Coordinates;
  };
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type ForwardGeocodeOptions = {
  apiKey: string;
  query: string;
  language?: string;
  country?: string;
  limit?: number;
  raw?: boolean;
  params?: Params;
};

export type ReverseGeocodeOptions = Omit<ForwardGeocodeOptions, "query"> & {
  coordinates: Coordinates;
};

export type AutocompleteOptions = ForwardGeocodeOptions & {
  sessionToken?: string;
};

export type RoutingOptions = Pick<
  ForwardGeocodeOptions,
  "apiKey" | "raw" | "params"
> & {
  markers: RoutingMarkers;
  transportMode?: TransportMode;
  alternatives?: boolean;
  renderPath?: boolean;
  traffic?: boolean;
};

export type RoutingOptionsAugmented = Pick<
  RoutingOptions,
  "apiKey" | "transportMode" | "alternatives" | "renderPath" | "params"
  > & {
  origin?: Coordinates;
  destination?: Coordinates;
  // ISO 8601
  departAt?: string;
  arriveAt?: string;
  geometries?: string;
};

export type AllOptions = ForwardGeocodeOptions &
  ReverseGeocodeOptions &
  AutocompleteOptions &
  RoutingOptions;

export type GeocoderUnifiedResult = {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  components: AddressComponents;
  extra: Extra;
};

export type AddressComponents = {
  streetNumber?: string;
  streetName?: string;
  building?: string;
  zipCode?: string;
  city?: string;
  region?: string;
  state?: string;
  county?: string;
  district?: string;
  neighborhood?: string;
  country?: string;
  countryCode?: string;
};

export type Extra = {
  id: string;
  bbox?: number[];
  confidence?: number;
};

export type AutocompleteUnifiedResult = Partial<
  Pick<GeocoderUnifiedResult, "formattedAddress" | "components" | "extra">
>;

export type ProvidersConfig = {
  [Property in Provider]: ProviderConfig;
};

export type ProviderConfig = {
  // url of different endpoints
  urls: UrlConfig;
  // mapping of options passed to the function
  // with the real name of the parameters used by the provider in query string
  options: OptionConfig;
};

type UrlConfig = {
  geocode: {
    forward: string;
    reverse: string;
  };
  autocomplete: string;
  routing: string;
};

type OptionConfig = {
  geocode: {
    forward: OptionMapping[];
    reverse: OptionMapping[];
  };
  autocomplete: OptionMapping[];
  routing: OptionMapping[];
};

export type OptionMapping = {
  option: keyof Omit<AllOptions, "raw" | "params"> | string;
  mappedParam: string | OptionMapping[];
  templateFn?: (arg: any) => string;
};

export type RoutingUnifiedResult = {
  // ISO 8601
  departureTime: string;
  arrivalTime: string;
  distance: {
    // in meters
    value: number;
    text: string;
  };
  duration: {
    // in seconds
    value: number;
    text: string;
  };
  typicalDuration?: {
    // in seconds
    value: number;
    text: string;
  };
  path?: GeoJSON;
};

type GeoJSON = {
  type: string;
  coordinates: number[][];
};
