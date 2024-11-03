export const apiResponse = {
	items: [
		{
			title: "Rue du Belvédère 23, 1050 Ixelles, Belgique",
			id: "here:af:streetsection:NEk2q66IKlrCDNB4JhoMOC:CggIBCCc4o62ARABGgIyMw",
			resultType: "houseNumber",
			houseNumberType: "PA",
			address: {
				label: "Rue du Belvédère 23, 1050 Ixelles, Belgique",
				countryCode: "BEL",
				countryName: "Belgique",
				stateCode: "BRU",
				state: "Bruxelles",
				county: "Bruxelles",
				city: "Ixelles",
				district: "Flagey - Malibran",
				street: "Rue du Belvédère",
				postalCode: "1050",
				houseNumber: "23",
			},
			position: {
				lat: 50.82679,
				lng: 4.37359,
			},
			access: [
				{
					lat: 50.82668,
					lng: 4.37367,
				},
			],
			mapView: {
				west: 4.37217,
				south: 50.82589,
				east: 4.37501,
				north: 50.82769,
			},
			scoring: {
				queryScore: 1,
				fieldScore: {
					country: 1,
					city: 1,
					streets: [1],
					houseNumber: 1,
					postalCode: 1,
				},
			},
		},
	],
}

export const expectedFormattedResult = [
	{
		formattedAddress: "Rue du Belvédère 23, 1050 Ixelles, Belgique",
		latitude: 50.82679,
		longitude: 4.37359,
		country: "Belgique",
		countryCode: "BE",
		state: "Bruxelles",
		county: "Bruxelles",
		city: "Ixelles",
		zipcode: "1050",
		district: "Flagey - Malibran",
		streetName: "Rue du Belvédère",
		streetNumber: "23",
		extra: {
			id: "here:af:streetsection:NEk2q66IKlrCDNB4JhoMOC:CggIBCCc4o62ARABGgIyMw",
			confidence: 1,
		},
	},
];