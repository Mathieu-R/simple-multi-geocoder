export interface GoogleAutocompleteResponse {
  predictions: Prediction[];
  status: string;
  error_message?: string;
  info_messages?: string[];
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  structured_formatting: StructuredFormatting;
  terms: Term[];
  distance_meters?: number;
  place_id?: string;
  types?: string[];
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MainTextMatchedSubstring[];
  secondary_text?: string;
  secondary_text_matched_substrings?: MainTextMatchedSubstring[];
}

export interface MainTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface Term {
  offset: number;
  value: string;
}
