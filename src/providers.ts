import countries from 'i18n-iso-countries';
import { OptionMapping, ProvidersConfig } from "./types/common";

export enum Provider {
	GOOGLE = "google",
	HERE = "here",
	MAPBOX = "mapbox",
}

const COMMON_GOOGLE_OPTIONS: OptionMapping[] = [
	{
		option: "apiKey",
		mappedParam: "key",
	},
	{
		option: "language",
		mappedParam: "language",
	},
	{
		option: "country",
		mappedParam: "region",
	},
];

const COMMON_HERE_OPTIONS: OptionMapping[] = [
	{
		option: "apiKey",
		mappedParam: "q",
	},
	{
		option: "language",
		mappedParam: "language",
	},
	{
		option: "country",
		mappedParam: "components",
		// alpha-3 ISO code with `countryCode:<alpha-3 ISO code>`
		templateFn: (countryCodeAlpha2: string) =>
			`countryCode:${countries.alpha2ToAlpha3(countryCodeAlpha2)}`,
	},
	{
		option: "limit",
		mappedParam: "limit",
	},
];

const COMMON_MAPBOX_OPTIONS: OptionMapping[] = [
	{
		option: "apiKey",
		mappedParam: "access_token",
	},
	{
		option: "language",
		mappedParam: "language",
	},
	{
		option: "country",
		mappedParam: "country",
	},
	{
		option: "limit",
		mappedParam: "limit",
	},
];

export const providers: ProvidersConfig = {
	google: {
		urls: {
			geocode: {
				forward: "https://maps.googleapis.com/maps/api/geocode/json",
				reverse: "https://maps.googleapis.com/maps/api/geocode/json",
			},
			autocomplete:
				"https://maps.googleapis.com/maps/api/place/autocomplete/json",
		},
		options: {
			geocode: {
				forward: [
					...COMMON_GOOGLE_OPTIONS,
					{
						option: "query",
						mappedParam: "address",
					},
				],
				reverse: [
					...COMMON_GOOGLE_OPTIONS,
					{
						option: "coordinates",
						mappedParam: "latlng",
					},
				],
			},
			autocomplete: [
				...COMMON_GOOGLE_OPTIONS,
				{
					option: "query",
					mappedParam: "address",
				},
				{
					option: "sessionToken",
					mappedParam: "sessiontoken",
				},
			],
		},
	},
	here: {
		urls: {
			geocode: {
				forward: "https://geocode.search.hereapi.com/v1/geocode",
				reverse: "https://reverse.search.hereapi.com/v1/geocode",
			},
			autocomplete:
				"https://maps.googleapis.com/maps/api/place/autocomplete/json",
		},
		options: {
			geocode: {
				forward: [
					...COMMON_HERE_OPTIONS,
					{
						option: "query",
						mappedParam: "q",
					},
				],
				reverse: [
					...COMMON_HERE_OPTIONS,
					{
						option: "coordinates",
						mappedParam: "at",
					},
				],
			},
			autocomplete: [
				...COMMON_HERE_OPTIONS,
				{
					option: "query",
					mappedParam: "q",
				},
			],
		},
	},
	mapbox: {
		urls: {
			geocode: {
				forward: "https://api.mapbox.com/search/geocode/v6/forward",
				reverse: "https://api.mapbox.com/search/geocode/v6/reverse",
			},
			autocomplete: "https://api.mapbox.com/search/searchbox/v1/suggest",
		},
		options: {
			geocode: {
				forward: [
					...COMMON_MAPBOX_OPTIONS,
					{
						option: "query",
						mappedParam: "q",
					},
				],
				reverse: [
					...COMMON_MAPBOX_OPTIONS,
					{
						option: "coordinates",
						mappedParam: [
							{
								option: "latitude",
								mappedParam: "latitude",
							},
							{
								option: "longitude",
								mappedParam: "longitude",
							},
						],
					},
				],
			},
			autocomplete: [
				...COMMON_MAPBOX_OPTIONS,
				{
					option: "query",
					mappedParam: "q",
				},
				{
					option: "sessionToken",
					mappedParam: "sessionToken",
				},
			],
		},
	},
};