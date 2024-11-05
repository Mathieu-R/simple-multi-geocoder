import { AllOptions, OptionMapping, Params } from "../types/common";
import { DEFAULT_LIMIT } from "../config";

export function createURLSearchParams(qs: Record<string, any> = {}) {
  return new URLSearchParams(JSON.parse(JSON.stringify(qs)));
}

export function getSearchParamsObject(
  options: Partial<Omit<AllOptions, "raw">>,
  optionsMapping: OptionMapping[],
  level: number = 0,
): Params {
  level = level + 1;

  if (level === 1) {
    options.limit = options.limit || DEFAULT_LIMIT;
  }

  const params = optionsMapping.reduce((prev, current) => {
    const { option, mappedParam, templateFn } = current;

    // option is not set by the user
    if (!(option in options)) {
      return prev;
    }

    if (Array.isArray(mappedParam)) {
      // create search param object recursively
      return {
        ...prev,
        ...getSearchParamsObject(options[option], mappedParam, level),
      };
    }

    prev[mappedParam] = templateFn
      ? templateFn(options[option])
      : options[option];

    return prev;
  }, {} as Params);

  if (level === 1 && options.params) {
    return { ...params, ...options.params } as Params;
  }

  return params as Params;
}

export function getError(httpStatus: number, message = "Error while fetching") {
  return new Error(`${message}: status=${httpStatus}`);
}
