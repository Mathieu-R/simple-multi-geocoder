export interface MapboxRoutingResponse {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  duration_typical: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export interface Leg {
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

export interface Step {
  intersections: Intersection[];
  maneuver: Maneuver;
  name: string;
  duration: number;
  distance: number;
  driving_side: string;
  weight: number;
  mode: string;
  ref?: string;
  geometry: Geometry;
  rotary_name?: string;
}

export interface Intersection {
  mapbox_streets_v8?: MapboxStreetsV8;
  entry: boolean[];
  bearings: number[];
  duration?: number;
  admin_index: number;
  out?: number;
  weight?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  turn_weight?: number;
  turn_duration?: number;
}

export interface MapboxStreetsV8 {
  class: string;
}

export interface Maneuver {
  type: string;
  instruction: string;
  bearing_after: number;
  bearing_before: number;
  location: number[];
  exit?: number;
  modifier?: string;
}

export interface Geometry {
  coordinates: number[][];
  type: string;
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}
