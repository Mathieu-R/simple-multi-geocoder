import { AllOptions, OptionMapping, Params } from "./types/common";
import { DEFAULT_LIMIT } from "./config";

export function createURLSearchParams(qs: Record<string, any> = {}) {
  return new URLSearchParams(JSON.parse(JSON.stringify(qs)));
}

export function getSearchParamsObject(
  options: Partial<Omit<AllOptions, "raw">>,
  optionsMapping: OptionMapping[],
  level: number = 1,
): Params {
  if (level === 1) {
    options.limit = options.limit || DEFAULT_LIMIT;
  }

  const params = optionsMapping.reduce((prev, current) => {
    // option is not set by the user
    if (!(current.option in options)) {
      return prev;
    }

    const { option, mappedParam, templateFn } = current;
    if (Array.isArray(mappedParam)) {
      // create search param object recursively
      return {
        ...prev,
        ...getSearchParamsObject(options[option], mappedParam, level++),
      };
    }

    prev[mappedParam] = templateFn
      ? templateFn(options[option])
      : options[option];
  }, {} as Params);

  if (level === 1 && options.params) {
    return { ...params, ...options.params } as Params;
  }

  return params as Params;
}

export function getError(httpStatus: number, message = "Error while fetching") {
  return new Error(`${message}: status=${httpStatus}`);
}

export function snakeToCamel(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    );
}
