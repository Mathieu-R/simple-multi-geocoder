import { MapboxAutocompleteResponse, Suggestion } from '../types/autocompleters/mapbox';
import { Provider, providers } from "../providers";
import {
	AutocompleteOptions,
	AutocompleteUnifiedResult
} from "../types/common";
import { createURLSearchParams, getSearchParamsObject } from "../utils";
import ky from 'ky';

export async function MapboxAutocomplete(
	options: AutocompleteOptions
) {
	const url = providers.mapbox.urls.autocomplete
	const searchParams = getSearchParamsObject(
		options,
		providers.mapbox.options.autocomplete
	);

	const response = await ky<MapboxAutocompleteResponse>(url, { searchParams: createURLSearchParams(searchParams) }).json()
	
	if (options.raw) {
		return response
	}

	return response.suggestions.map(item => formatResult(item))
}

function formatResult(result: Suggestion) {
	return {
		formattedAddress: result.full_address,
		components: {
			streetNumber: result.context.street.name,
			zipCode: result.context.postcode.name,
			city: result.context.place.name,
			region: result.context.region.name,
			country: result.context.country.name,
			countryCode: result.context.country.country_code
		},
		extra: {
			id: result.mapbox_id
		}

	} as AutocompleteUnifiedResult
}