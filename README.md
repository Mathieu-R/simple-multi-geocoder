# simple-multi-geocoder

## Features

- Geocode forward and reverse.
- Autocomplete addresses.
- Available both in the browser and node.

## Supported providers

- Google
- Here
- Mapbox

## Installing

### Package manager

Using npm:

```bash
$ npm install simple-multi-geocoder
```

Using yarn:

```bash
$ yarn add simple-multi-geocoder
```

Using pnpm:

```bash
$ pnpm add simple-multi-geocoder
```

Once the package has been installed, import the library using either `import` or `require`:

```ts
import { geocode, autocomplete } from "simple-multi-geocoder";
```

## Here OAuth 2.0

Besides traditionnal API Key, Here provider supports OAuth 2.0 authentication, see [here documentation](https://www.here.com/docs/bundle/identity-and-access-management-developer-guide/page/topics/plat-token.html) for more information.

This package provides a helper function to generate the access token.

```ts
import { generateHereAccessToken } from "simple-multi-geocoder";
const accessToken = await generateHereAccessToken({
  clientId: "...",
  clientSecret: "...",
});
```

In that case, you should pass the `bearerToken` instead of `apiKey` in the options object.

```ts
const response = await geocode.forward("here", {
  credentials: { bearerToken: accessToken },
  query: "Rue du Belvédère 23, 1050 Ixelles, Belgique",
  country: "BE",
  language: "fr",
  limit: 1,
  raw: true,
});
```

## API

### Forward geocoding

#### geocode.forward(provider, options)

```ts
import { geocode } from "simple-multi-geocoder";

const API_KEY = "..."; // get it from secure environment
const address = "Rue du Belvédère 23, 1050 Ixelles, Belgique";

const response = await geocode.forward("here", {
  credentials: { apiKey: API_KEY },
  query: address,
  country: "BE",
  language: "fr",
  limit: 1,
});

console.log(response);
/*
{
  formattedAddress: "Rue du Belvédère 23, 1050 Ixelles, Belgique",
  latitude: 50.82679,
  longitude: 4.37359,
  components: {
    streetNumber: "23",
    streetName: "Rue du Belvédère",
    zipcode: "1050",
    city: "Ixelles",
    county: "Bruxelles",
    state: "Bruxelles",
    district: "Flagey - Malibran",
    country: "Belgique",
    countryCode: "BE",
  },
  extra: {
    id: "here:af:streetsection:NEk2q66IKlrCDNB4JhoMOC:CggIBCCc4o62ARABGgIyMw",
    confidence: 1,
  },
}
*/
```

| Parameter                 | Description                                 |
| ------------------------- | ------------------------------------------- |
| `provider` (**required**) | Provider (_google_, _here_, _mapbox_) token |
| `options` (**required**)  | Options object (**see below**)              |

##### options

| Parameter                    | Type    | Description                                                                                                              |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `credentials` (**required**) | object  | Provider access token (**see below**)                                                                                    |
| `query` (**required**)       | string  | Complete address in string format (e.g. _Rue du Belvédère 23, 1050 Ixelles, Belgique_)                                   |
| `address`                    | StructuredAddress | Structured address object to geocode (_see below_)                                                                   |
| `language`                   | string  | Language of the returned result (_[IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) format_)                |
| `countryCode`                | string  | Limit the search to a specific country (_[ISO_3166-1_alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format_) |
| `limit`                      | number  | Maximum number of results to be returned (**default: 1**) (_not supported by Google_)                                    |
| `raw`                        | boolean | Return the raw result                                                                                                    |
| `params`                     | object  | Params object specific to the provider (**see below**)                                                                   |

###### Object `StructuredAddress`

Only available for Here provider for now, you can pass an object with the following fields:

```ts
import { StructuredAddress } from "simple-multi-geocoder";
const address: StructuredAddress = {
  street: "Rue du chemin",
  number: "123",
  zip: "1234",
  city: "City",
  countryCode: "Country Code (in ISO 3166-1 alpha-2 format)",
};
```

##### credentials

You should provide one of the following fields:

| Parameter     | Type   | Description                                         |
| ------------- | ------ | --------------------------------------------------- |
| `apiKey`      | string | Provider api key                                    |
| `bearerToken` | string | Provider bearer token (**only available for Here**) |

##### params

You can check the official API documentation from providers to see which options you can pass the geocoder

- Google: https://developers.google.com/maps/documentation/geocoding/requests-geocoding?hl=en#geocoding-lookup
- Mapbox: https://docs.mapbox.com/api/search/geocoding/#forward-geocoding-with-search-text-input
- Here: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1geocode/get

#### Results

We always return an array of object with the following fields

| Field            | Type   | Description                                            |
| ---------------- | ------ | ------------------------------------------------------ |
| formattedAddress | string | The complete formatted address                         |
| latitude         | number | The latitude of the result                             |
| longitude        | number | The longitude of the result                            |
| components       | object | The address components (**see below**)                 |
| extra            | object | An object with additional informations (**see below**) |

##### components

| Field        | Type   | Description                                                                                                    |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| country      | string | The country where is located the result                                                                        |
| countryCode  | string | The country code of the result ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format) |
| state        | string | The state where is located the result                                                                          |
| region       | string | The region where is located the result                                                                         |
| city         | string | The city where is located the result                                                                           |
| zipCode      | string | The postal code of the city                                                                                    |
| streetName   | string | The street name where is located the result                                                                    |
| streetNumber | string | The street number where is located the result                                                                  |

##### extra

| Field      | Type   | Description                                                                         |
| ---------- | ------ | ----------------------------------------------------------------------------------- |
| id         | string | The unique identifier of the result provided by the provider                        |
| bbox       | object | The bounding box of the result                                                      |
| confidence | number | A number between 0 and 1 indicating how the result location correspond to our query |

### Reverse geocoding

#### geocode.reverse(provider, options)

```ts
import { geocode } from "simple-multi-geocoder";

const API_KEY = ... // get it from secure environment
const address = "Rue du Belvédère 23, 1050 Ixelles, Belgique"

const coordinates = {
  latitude: 50.82679,
  longitude: 4.37359
}

const response = await geocode.reverse(
  "here",
  { apiKey: API_KEY, coordinates: coordinates, country: "BE", language: "fr", limit: 1 }
)

console.log(response)
/*
{
  formattedAddress: "Rue du Belvédère 23, 1050 Ixelles, Belgique",
  latitude: 50.82679,
  longitude: 4.37359,
  components: {
    streetNumber: "23",
    streetName: "Rue du Belvédère",
    zipcode: "1050",
    city: "Ixelles",
    county: "Bruxelles",
    state: "Bruxelles",
    district: "Flagey - Malibran",
    country: "Belgique",
    countryCode: "BE",
  },
  extra: {
    id: "here:af:streetsection:NEk2q66IKlrCDNB4JhoMOC:CggIBCCc4o62ARABGgIyMw",
    confidence: 1,
  },
}
*/
```

| Parameter                 | Description                                 |
| ------------------------- | ------------------------------------------- |
| `provider` (**required**) | Provider (_google_, _here_, _mapbox_) token |
| `options` (**required**)  | Options object (**see below**)              |

##### options

| Parameter                    | Type    | Description                                                                                                              |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `credentials` (**required**) | object  | Provider access token (**see above**)                                                                                    |
| `coordinates` (**required**) | object  | coordinates of the point to reverse geocode                                                                              |
| `language`                   | string  | Language of the returned result (_[IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) format_)                |
| `countryCode`                    | string  | Limit the search to a specific country (_[ISO_3166-1_alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format_) |
| `limit`                      | number  | Maximum number of results to be returned (**default: 1**) (_not supported by Google_)                                    |
| `raw`                        | boolean | Return the raw result                                                                                                    |
| `params`                     | object  | Params object specific to the provider (**see below**)                                                                   |

##### coordinates

| Field     | Type   | Description            |
| --------- | ------ | ---------------------- |
| latitude  | number | Latitude of the point  |
| longitude | number | Longitude of the point |

##### params

You can check the official API documentation from providers to see which options you can pass the geocoder

- Google: https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding?hl=en
- Mapbox: https://docs.mapbox.com/api/search/geocoding/#reverse-geocoding
- Here: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1revgeocode/get

#### Results

We always return an array of object with the following fields

| Field            | Type   | Description                                            |
| ---------------- | ------ | ------------------------------------------------------ |
| formattedAddress | string | The complete formatted address                         |
| latitude         | number | The latitude of the result                             |
| longitude        | number | The longitude of the result                            |
| components       | object | The address components (**see below**)                 |
| extra            | object | An object with additional informations (**see below**) |

##### components

| Field        | Type   | Description                                                                                                    |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| country      | string | The country where is located the result                                                                        |
| countryCode  | string | The country code of the result ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format) |
| state        | string | The state where is located the result                                                                          |
| region       | string | The region where is located the result                                                                         |
| city         | string | The city where is located the result                                                                           |
| zipCode      | string | The postal code of the city                                                                                    |
| streetName   | string | The street name where is located the result                                                                    |
| streetNumber | string | The street number where is located the result                                                                  |

##### extra

| Field      | Type   | Description                                                                         |
| ---------- | ------ | ----------------------------------------------------------------------------------- |
| id         | string | The unique identifier of the result provided by the provider                        |
| bbox       | object | The bounding box of the result                                                      |
| confidence | number | A number between 0 and 1 indicating how the result location correspond to our query |

### Autocomplete

#### autocomplete(provider, options)

```ts
import { autocomplete } from "simple-multi-geocoder";

const API_KEY = ... // get it from secure environment
const address = "Rue du Belvédère 23, 1050 Ixelles, Belgique"

const response = await autocomplete(
  "here",
  { apiKey: API_KEY, query: address, country: "BE", language: "fr", limit: 1 }
)

console.log(response)
/*
{
  formattedAddress: "Rue du Belvédère 23",
  components: {
    streetNumber: "23",
    streetName: "Rue du Belvédère",
    zipcode: "1050",
    city: "Ixelles",
    county: "Bruxelles",
    state: "Bruxelles",
    district: "Flagey - Malibran",
    country: "Belgique",
    countryCode: "BE",
  },
  extra: {
    id: "here:af:streetsection:NEk2q66IKlrCDNB4JhoMOC:CggIBCCc4o62ARABGgIyMw"
  },
}
*/
```

| Parameter                 | Description                                 |
| ------------------------- | ------------------------------------------- |
| `provider` (**required**) | Provider (_google_, _here_, _mapbox_) token |
| `options` (**required**)  | Options object (**see below**)              |

##### options

| Parameter                    | Type    | Description                                                                                                              |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `credentials` (**required**) | object  | Provider access token (**see above**)                                                                                    |
| `query` (**required**)       | string  | Partial address in string format (e.g. _Rue du Belvédère 23_)                                                            |
| `language`                   | string  | Language of the returned result (_[IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) format_)                |
| `countryCode`                    | string  | Limit the search to a specific country (_[ISO_3166-1_alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format_) |
| `limit`                      | number  | Maximum number of results to be returned (**default: 1**) (_not supported by Google_)                                    |
| `raw`                        | boolean | Return the raw result                                                                                                    |
| `params`                     | object  | Params object specific to the provider (**see below**)                                                                   |

##### params

You can check the official API documentation from providers to see which options you can pass the geocoder

- Google: https://developers.google.com/maps/documentation/places/web-service/autocomplete?hl=en
- Mapbox: https://docs.mapbox.com/api/search/search-box/#get-suggested-results
- Here: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1autocomplete/get

#### Results

We always return an array of object with the following fields

| Field                     | Type   | Description                                            |
| ------------------------- | ------ | ------------------------------------------------------ |
| formattedAddress          | string | The complete formatted address                         |
| components (**optional**) | object | The address components (**see below**)                 |
| extra                     | object | An object with additional informations (**see below**) |

##### components

| Field        | Type   | Description                                                                                                    |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| country      | string | The country where is located the result                                                                        |
| countryCode  | string | The country code of the result ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format) |
| state        | string | The state where is located the result                                                                          |
| region       | string | The region where is located the result                                                                         |
| city         | string | The city where is located the result                                                                           |
| zipCode      | string | The postal code of the city                                                                                    |
| streetName   | string | The street name where is located the result                                                                    |
| streetNumber | string | The street number where is located the result                                                                  |

##### extra

| Field | Type   | Description                                                  |
| ----- | ------ | ------------------------------------------------------------ |
| id    | string | The unique identifier of the result provided by the provider |
