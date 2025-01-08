import { fr, enUS, nlBE } from "date-fns/locale";

export function snakeToCamel(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    );
}

export function getLocaleFromLanguage(language?: string) {
  switch (language) {
    case "fr":
      return fr;
    case "en":
      return enUS;
    case "nl":
      return nlBE;
    default:
      return enUS;
  }
}
