export const apiForwardGeocodingResponse = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
      geometry: { type: "Point", coordinates: [4.373591, 50.826795] },
      properties: {
        mapbox_id:
          "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
        feature_type: "address",
        full_address:
          "Rue Du Belvédère - Belvédèrestraat 23, 1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
        name: "Rue Du Belvédère 23",
        name_preferred: "Rue Du Belvédère - Belvédèrestraat 23",
        coordinates: {
          longitude: 4.373591,
          latitude: 50.826795,
          accuracy: "point",
          routable_points: [
            {
              name: "default",
              latitude: 50.826686,
              longitude: 4.373669,
            },
          ],
        },
        place_formatted: "1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
        match_code: {
          address_number: "matched",
          street: "unmatched",
          postcode: "matched",
          place: "matched",
          region: "unmatched",
          locality: "not_applicable",
          country: "matched",
          confidence: "low",
        },
        context: {
          address: {
            mapbox_id:
              "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
            address_number: "23",
            street_name: "Rue Du Belvédère - Belvédèrestraat",
            name: "Rue Du Belvédère - Belvédèrestraat 23",
          },
          street: {
            mapbox_id:
              "dXJuOm1ieGFkci1zdHI6N2MyNTNlMzktMjdmMy00NzMyLWI2NTYtMThhYzY2YWUxODky",
            name: "Rue Du Belvédère - Belvédèrestraat",
          },
          postcode: {
            mapbox_id: "dXJuOm1ieHBsYzpyaFU",
            name: "1050",
          },
          locality: {
            mapbox_id: "dXJuOm1ieHBsYzpPV29W",
            name: "Elsene",
            translations: {
              fr: { language: "fr", name: "Elsene" },
            },
          },
          place: {
            mapbox_id: "dXJuOm1ieHBsYzpJS2dW",
            name: "Ixelles",
            wikidata_id: "Q208713",
            translations: {
              fr: { language: "fr", name: "Ixelles" },
            },
          },
          region: {
            mapbox_id: "dXJuOm1ieHBsYzpBV1FW",
            name: "Région de Bruxelles-Capitale",
            wikidata_id: "Q240",
            region_code: "BRU",
            region_code_full: "BE-BRU",
            translations: {
              fr: {
                language: "fr",
                name: "Région de Bruxelles-Capitale",
              },
            },
          },
          country: {
            mapbox_id: "dXJuOm1ieHBsYzpJaFU",
            name: "Belgique",
            wikidata_id: "Q31",
            country_code: "BE",
            country_code_alpha_3: "BEL",
            translations: {
              fr: { language: "fr", name: "Belgique" },
            },
          },
        },
      },
    },
  ],
};

export const expectedForwardGeocodingFormattedResult = [
  {
    formattedAddress:
      "Rue Du Belvédère - Belvédèrestraat 23, 1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
    latitude: 50.826795,
    longitude: 4.373591,
    components: {
      country: "Belgique",
      countryCode: "BE",
      state: "Région de Bruxelles-Capitale",
      city: "Ixelles",
      zipcode: "1050",
      streetName: "Rue Du Belvédère - Belvédèrestraat",
      streetNumber: "23",
      neighbourhood: "Elsene",
    },
    extra: {
      id: "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
      confidence: 0,
    },
  },
];

export const apiReverseGeocodingResponse = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
      geometry: { type: "Point", coordinates: [4.373591, 50.826795] },
      properties: {
        mapbox_id:
          "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
        feature_type: "address",
        full_address:
          "Rue Du Belvédère - Belvédèrestraat 23, 1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
        name: "Rue Du Belvédère - Belvédèrestraat 23",
        name_preferred: "Rue Du Belvédère - Belvédèrestraat 23",
        coordinates: {
          longitude: 4.373591,
          latitude: 50.826795,
          accuracy: "point",
          routable_points: [
            { name: "default", latitude: 50.826686, longitude: 4.373669 },
          ],
        },
        place_formatted: "1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
        context: {
          address: {
            mapbox_id:
              "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
            address_number: "23",
            street_name: "Rue Du Belvédère - Belvédèrestraat",
            name: "Rue Du Belvédère - Belvédèrestraat 23",
          },
          street: {
            mapbox_id:
              "dXJuOm1ieGFkci1zdHI6N2MyNTNlMzktMjdmMy00NzMyLWI2NTYtMThhYzY2YWUxODky",
            name: "Rue Du Belvédère - Belvédèrestraat",
          },
          postcode: { mapbox_id: "dXJuOm1ieHBsYzpyaFU", name: "1050" },
          locality: {
            mapbox_id: "dXJuOm1ieHBsYzpPV29W",
            name: "Elsene",
            translations: { fr: { language: "fr", name: "Elsene" } },
          },
          place: {
            mapbox_id: "dXJuOm1ieHBsYzpJS2dW",
            name: "Ixelles",
            wikidata_id: "Q208713",
            translations: { fr: { language: "fr", name: "Ixelles" } },
          },
          region: {
            mapbox_id: "dXJuOm1ieHBsYzpBV1FW",
            name: "Région de Bruxelles-Capitale",
            wikidata_id: "Q240",
            region_code: "BRU",
            region_code_full: "BE-BRU",
            translations: {
              fr: { language: "fr", name: "Région de Bruxelles-Capitale" },
            },
          },
          country: {
            mapbox_id: "dXJuOm1ieHBsYzpJaFU",
            name: "Belgique",
            wikidata_id: "Q31",
            country_code: "BE",
            country_code_alpha_3: "BEL",
            translations: { fr: { language: "fr", name: "Belgique" } },
          },
        },
      },
    },
  ]
};

export const expectedReverseGeocodingFormattedResult = [
  {
    formattedAddress:
      "Rue Du Belvédère - Belvédèrestraat 23, 1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
    latitude: 50.826795,
    longitude: 4.373591,
    components: {
      country: "Belgique",
      countryCode: "BE",
      state: "Région de Bruxelles-Capitale",
      city: "Ixelles",
      zipcode: "1050",
      streetName: "Rue Du Belvédère - Belvédèrestraat",
      streetNumber: "23",
      neighbourhood: "Elsene",
    },
    extra: {
      id: "dXJuOm1ieGFkcjo3YzI1M2UzOS0yN2YzLTQ3MzItYjY1Ni0xOGFjNjZhZTE4OTI",
      confidence: 0,
    },
  },
];

export const apiAutocompleteResponse = {
  "suggestions": [
    {
      "name": "Rue Du Belvédère",
      "name_preferred": "Rue Du Belvédère - Belvédèrestraat",
      "mapbox_id": "dXJuOm1ieGFkci1zdHI6ZGEwMzM0MTgtMGU0MS00Y2YyLWE2Y2QtYWJmZDM5OTZlNjM0",
      "feature_type": "street",
      "place_formatted": "1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
      "context": {
        "country": {
          "id": "dXJuOm1ieHBsYzpJaFU",
          "name": "Belgique",
          "country_code": "BE",
          "country_code_alpha_3": "BEL"
        },
        "region": {
          "id": "dXJuOm1ieHBsYzpBV1FW",
          "name": "Région de Bruxelles-Capitale",
          "region_code": "BRU",
          "region_code_full": "BE-BRU"
        },
        "postcode": {"id": "dXJuOm1ieHBsYzpyaFU", "name": "1050"},
        "place": {"id": "dXJuOm1ieHBsYzpJS2dW", "name": "Ixelles"},
        "locality": {"id": "dXJuOm1ieHBsYzpPV29W", "name": "Elsene"},
        "street": {
          "id": "dXJuOm1ieGFkci1zdHI6ZGEwMzM0MTgtMGU0MS00Y2YyLWE2Y2QtYWJmZDM5OTZlNjM0",
          "name": "Rue Du Belvédère"
        }
      },
      "language": "fr",
      "maki": "marker",
      "metadata": {}
    },
  ]
}


export const expectedAutocompleteFormattedResult = [
  {
    formattedAddress:
      "Rue Du Belvédère 1050 Ixelles, Région de Bruxelles-Capitale, Belgique",
    components: {
      country: "Belgique",
      countryCode: "BE",
      city: "Ixelles",
      zipcode: "1050",
      streetName: "Rue Du Belvédère - Belvédèrestraat",
      neighbourhood: "Elsene",
    },
    extra: {
      id: "dXJuOm1ieGFkci1zdHI6ZGEwMzM0MTgtMGU0MS00Y2YyLWE2Y2QtYWJmZDM5OTZlNjM0",
      confidence: 0,
    },
  },
];
