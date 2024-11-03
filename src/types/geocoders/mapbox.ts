// Thanks to: https://transform.tools/json-to-typescript

// https://docs.mapbox.com/api/search/geocoding/#geocoding-response-object
export interface MapboxResponse {
  type: string;
  features: Feature[];
  attribution: string;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name?: string;
  name_preferred?: string;
  coordinates: Coordinates;
  place_formatted?: string;
  match_code?: MatchCode;
  context: Context;
  bbox?: number[];
}

export interface Coordinates {
  longitude: number;
  latitude: number;
  accuracy?: string;
  routable_points?: RoutablePoint[];
}

export interface RoutablePoint {
  name: string;
  latitude: number;
  longitude: number;
}

export interface MatchCode {
  address_number: string;
  street: string;
  postcode: string;
  place: string;
  region: string;
  locality: string;
  country: string;
  confidence: string;
}

export interface Context {
  address?: Address;
  street?: ContextItem;
  postcode?: ContextItem;
  locality?: ContextItem;
  place?: ContextItem;
  region?: Region;
  district?: ContextItem;
  country?: Country;
  neighborhood?: ContextItem;
}

export interface ContextItem {
  mapbox_id: string;
  name: string;
}

export interface Address extends ContextItem {
  address_number: string;
  street_name: string;
}
export interface Region extends ContextItem {
  region_code: string;
  region_code_full: string;
}

export interface Country extends ContextItem {
  country_code: string;
  country_code_alpha_3: string;
}
