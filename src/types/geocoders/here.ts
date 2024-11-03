export interface HereResponse {
  items: Feature[];
}

export interface Feature {
  title: string;
  id: string;
  politicalView: string;
  resultType: string;
  houseNumberType: string;
  addressBlockType: string;
  localityType: string;
  administrativeAreaType: string;
  address: Address;
  postalCodeDetails: PostalCodeDetail[];
  position: Position;
  access: Access[];
  distance: number;
  mapView: MapView;
  categories: Category[];
  foodTypes: FoodType[];
  houseNumberFallback: boolean;
  estimatedPointAddress: boolean;
  timeZone: TimeZone;
  scoring: Scoring;
  parsing: Parsing;
  streetInfo: StreetInfo[];
  countryInfo: CountryInfo;
  translations: Translations;
  mapReferences: MapReferences;
  related: Related[];
  navigationAttributes: NavigationAttributes;
  secondaryUnitInfo: SecondaryUnitInfo[];
}

export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  countyCode: string;
  county: string;
  city: string;
  district: string;
  subdistrict: string;
  street: string;
  streets: string[];
  block: string;
  subblock: string;
  postalCode: string;
  houseNumber: string;
  building: string;
  unit: string;
}

export interface PostalCodeDetail {
  postalCode: string;
  postalEntity: string;
  postalCodeType: string;
  zipClassificationCode: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Access {
  lat: number;
  lng: number;
}

export interface MapView {
  west: number;
  south: number;
  east: number;
  north: number;
}

export interface Category {
  id: string;
  name: string;
  primary: boolean;
}

export interface FoodType {
  id: string;
  name: string;
  primary: boolean;
}

export interface TimeZone {
  name: string;
  utcOffset: string;
}

export interface Scoring {
  queryScore: number;
  fieldScore: FieldScore;
}

export interface FieldScore {
  country: number;
  countryCode: number;
  state: number;
  stateCode: number;
  county: number;
  countyCode: number;
  city: number;
  district: number;
  subdistrict: number;
  streets: number[];
  block: number;
  subblock: number;
  houseNumber: number;
  postalCode: number;
  building: number;
  unit: number;
  placeName: number;
  ontologyName: number;
}

export interface Parsing {
  placeName: PlaceName[];
  country: Country[];
  state: State[];
  county: County[];
  city: City[];
  district: District[];
  subdistrict: Subdistrict[];
  street: Street[];
  block: Block[];
  subblock: Subblock[];
  houseNumber: HouseNumber[];
  postalCode: PostalCode[];
  building: Building[];
  secondaryUnits: SecondaryUnit[];
  ontologyName: OntologyName[];
}

export interface PlaceName {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface Country {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface State {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface County {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface City {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface District {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface Subdistrict {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface Street {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface Block {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface Subblock {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface HouseNumber {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface PostalCode {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface Building {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface SecondaryUnit {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface OntologyName {
  start: number;
  end: number;
  value: string;
  qq: string;
}

export interface StreetInfo {
  baseName: string;
  streetType: string;
  streetTypePrecedes: boolean;
  streetTypeAttached: boolean;
  prefix: string;
  suffix: string;
  direction: string;
  language: string;
}

export interface CountryInfo {
  alpha2: string;
  alpha3: string;
}

export interface Translations {
  stateNames: StateName[];
  countyNames: CountyName[];
  cityNames: CityName[];
  districtNames: DistrictName[];
}

export interface StateName {
  names: Name[];
  preference: string;
}

export interface Name {
  value: string;
  language: string;
  type: string;
  primary: boolean;
  transliterated: boolean;
}

export interface CountyName {
  names: Name2[];
  preference: string;
}

export interface Name2 {
  value: string;
  language: string;
  type: string;
  primary: boolean;
  transliterated: boolean;
}

export interface CityName {
  names: Name3[];
  preference: string;
}

export interface Name3 {
  value: string;
  language: string;
  type: string;
  primary: boolean;
  transliterated: boolean;
}

export interface DistrictName {
  names: Name4[];
  preference: string;
}

export interface Name4 {
  value: string;
  language: string;
  type: string;
  primary: boolean;
  transliterated: boolean;
}

export interface MapReferences {
  links: Link[];
  pointAddress: PointAddress;
  segments: Segment[];
  country: Country2;
  state: State2;
  county: County2;
  city: City2;
  district: District2;
  subdistrict: Subdistrict2;
  cmVersion: CmVersion;
}

export interface Link {
  cmId: string;
  side: string;
}

export interface PointAddress {
  hmcId: string;
}

export interface Segment {
  ref: string;
  side: string;
}

export interface Country2 {
  hmcId: string;
}

export interface State2 {
  hmcId: string;
}

export interface County2 {
  hmcId: string;
}

export interface City2 {
  hmcId: string;
}

export interface District2 {
  hmcId: string;
}

export interface Subdistrict2 {
  hmcId: string;
}

export interface CmVersion {
  region: string;
  dvn: string;
}

export interface Related {
  relationship: string;
  title: string;
  id: string;
  resultType: string;
  houseNumberType: string;
  address: Address2;
  position: Position2;
  access: Access2[];
  distance: number;
  routeDistance: number;
  bearing: number;
  mapView: MapView2;
  mapReferences: MapReferences2;
}

export interface Address2 {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  countyCode: string;
  county: string;
  city: string;
  district: string;
  subdistrict: string;
  street: string;
  streets: string[];
  block: string;
  subblock: string;
  postalCode: string;
  houseNumber: string;
  building: string;
  unit: string;
}

export interface Position2 {
  lat: number;
  lng: number;
}

export interface Access2 {
  lat: number;
  lng: number;
}

export interface MapView2 {
  west: number;
  south: number;
  east: number;
  north: number;
}

export interface MapReferences2 {
  links: Link2[];
  pointAddress: PointAddress2;
  segments: Segment2[];
  country: Country3;
  state: State3;
  county: County3;
  city: City3;
  district: District3;
  subdistrict: Subdistrict3;
  cmVersion: CmVersion2;
}

export interface Link2 {
  cmId: string;
  side: string;
}

export interface PointAddress2 {
  hmcId: string;
}

export interface Segment2 {
  ref: string;
  side: string;
}

export interface Country3 {
  hmcId: string;
}

export interface State3 {
  hmcId: string;
}

export interface County3 {
  hmcId: string;
}

export interface City3 {
  hmcId: string;
}

export interface District3 {
  hmcId: string;
}

export interface Subdistrict3 {
  hmcId: string;
}

export interface CmVersion2 {
  region: string;
  dvn: string;
}

export interface NavigationAttributes {
  speedLimits: SpeedLimit[];
  functionalClass: FunctionalClass[];
  access: Access3[];
  physical: Physical[];
}

export interface SpeedLimit {
  maxSpeed: number;
  direction: string;
  speedUnit: string;
  source: string;
}

export interface FunctionalClass {
  value: string;
}

export interface Access3 {
  automobiles: boolean;
  bicycles: boolean;
  buses: boolean;
  carpools: boolean;
  deliveries: boolean;
  emergencyVehicles: boolean;
  motorcycles: boolean;
  pedestrians: boolean;
  taxis: boolean;
  throughTraffic: boolean;
  trucks: boolean;
}

export interface Physical {
  boatFerry: boolean;
  bridge: boolean;
  deliveryRoad: boolean;
  movableBridge: boolean;
  multiplyDigitized: boolean;
  paved: boolean;
  private: boolean;
  railFerry: boolean;
  tunnel: boolean;
}

export interface SecondaryUnitInfo {
  normalizedUnitType: string;
  unitValue: string;
}
