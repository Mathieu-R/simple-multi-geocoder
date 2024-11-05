export interface HereRoutingResponse {
  routes: Route[];
}

export interface Route {
  id: string;
  sections: Section[];
}

export interface Section {
  id: string;
  type: string;
  actions: Action[];
  departure: Departure;
  arrival: Arrival;
  summary: Summary;
  polyline: string;
  spans: Span[];
  transport: Transport;
  travelSummary: TravelSummary;
}

export interface TravelSummary {
  duration: number
  length: number
  baseDuration?: number
  consumption?: number
  typicalDuration?: number;
  mlDuration?: number
  co2Emission?: number
}

export interface Action {
  action: string;
  duration: number;
  instruction: string;
  offset: number;
}

export interface Departure {
  time: string;
  place: Place;
}

export interface Place {
  type: string;
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Arrival {
  time: string;
  place: Place2;
}

export interface Place2 {
  type: string;
  location: Location2;
}

export interface Location2 {
  lat: number;
  lng: number;
}

export interface Summary {
  duration: number;
  length: number;
}

export interface Span {
  offset: number;
  names: Name[];
  length: number;
}

export interface Name {
  value: string;
  language: string;
}

export interface Transport {
  mode: string;
}
