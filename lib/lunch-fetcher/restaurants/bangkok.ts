import { Item, RestaurantData } from "./bangkok_types";
import { groupBy, take } from "lodash-es";
import { filterMap, mapDayNameToWeekDay } from "../lib/utils";
import { RestaurantDayMenu, FoodItem, Restaurant } from "../types";

const QUERY = `
query Query($clientId: String!) {
  items(clientId: $clientId) {
    id
    name
    preview
    info
    description
    outOfStock
    sortOrder
    category
    ingestions {
        price
        type
    }
    itemCategory
  }
  itemCategories(clientId: $clientId) {
      id
      name
      preview
      description
      category
  }
}
`;

const CLIENT_ID = "5c0644cbfd30240bfdb26765";

export const url = "https://www.bkgbg.se/lunch";

export const fetchMeals = (): Promise<RestaurantData> =>
  fetch("https://secure.paidit.se/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { clientId: CLIENT_ID },
      operationName: "Query",
    }),
  })
    .then((r) => r.json())
    .then((r) => r.data);

const transformToFoodItem = (item: Item): FoodItem => {
  const isVegetarian = item.description.match(/VEGETARISK/);
  const isVegan = item.description.match(/VEGAN/);

  return {
    name: item.description
      .replace(/\(?VEGETARISK\)? ?/, "")
      .replace(/\(?VEGAN\)? ?/, "")
      .replace(/ \./g, "."),
    title: (
      item.name.replace(/,$/g, "").replace(",", " — ") +
      (isVegetarian ? " — VEGETARISK" : isVegan ? " — VEGANSK" : "")
    ).toUpperCase(),
  };
};

const groupMeals = (data: RestaurantData): RestaurantDayMenu[] => {
  const itemsByItemCategory = groupBy(data.items, (item) => item.itemCategory);

  const days = data.itemCategories.filter((category) =>
    category.name.toLowerCase().includes("lunch")
  );

  return filterMap(days, (day) => {
    const dayName = mapDayNameToWeekDay(day.name);

    if (!dayName) {
      return null;
    }

    return {
      items: take(itemsByItemCategory[day.id], 5).map(transformToFoodItem),
      wday: dayName,
    };
  });
};

export const parseResponse = (restaurantData: RestaurantData): Restaurant => ({
  name: "Bangkok Kitchen",
  url,
  days: groupMeals(restaurantData),
});
