import * as _ from "lodash";
import { Restaurant, FoodItem, RestaurantDayMenu, WeekDay } from "../types";

export const url = "https://schnitzelplatz.se/lunch/";

export const parseHtml = ($: CheerioStatic): Restaurant => {
  const menus = $(
    ".textblock.section-padding--medium.blockwidth--small.text-align-center h4"
  )
    .get()
    .map(node => [
      $(node).text(),
      $(node)
        .next("p")
        .text()
    ]);

  const numWeekItems = menus.length - 5;

  const weekItems: FoodItem[] = _.take(menus, numWeekItems).map(
    ([title, name]) => ({
      title: title.toUpperCase(),
      name
    })
  );
  const dayItems = _.drop(menus, numWeekItems);

  const days: RestaurantDayMenu[] = dayItems.map(([day, name]) => ({
    wday: day as WeekDay,
    items: [{ name }].concat(weekItems)
  }));

  return { name: "Schnitzelplatz Lagerhuset", url, days };
};
