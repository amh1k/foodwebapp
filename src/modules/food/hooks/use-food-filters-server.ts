import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { createLoader } from "nuqs/server";

export const params = {
  search: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),

  tags: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([]),
  category: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  minRating: parseAsString
    .withOptions({ clearOnDefault: true })
    .withDefault(""),
};
export type FoodFilters = {
  search: string;
  tags: string[];
  category: string;
  minRating: string;
};

// export const useFoodFilters = () => {
//   return useQueryStates(params);
// };
export const loadFoodFilters = createLoader(params);
