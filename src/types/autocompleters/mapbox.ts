export interface MapboxAutocompleteResponse {
  suggestions: Suggestion[];
  attribution: string;
  response_id: string;
  url: string;
}

export interface Suggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: Context;
  language: string;
  maki: string;
  metadata: Metadata;
  distance: number;
}

export interface Context {
  country: Country;
  region: Region;
  postcode: Postcode;
  place: Place;
  locality: Locality;
  address: Address;
  street: Street;
}

export interface Country {
  id: string;
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface Region {
  id: string;
  name: string;
  region_code: string;
  region_code_full: string;
}

export interface Postcode {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: string;
}

export interface Locality {
  id: string;
  name: string;
}

export interface Address {
  id: string;
  name: string;
  address_number: string;
  street_name: string;
}

export interface Street {
  id: string;
  name: string;
}

export interface Metadata {}
