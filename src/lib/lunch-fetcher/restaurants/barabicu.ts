import { isNotNull, filterMap } from "../lib/utils";
import { FoodItem, Restaurant, WeekDay, RestaurantDayMenu } from "../types";

export const url = "https://barabicu.se/";

const weekdayTranslations: WeekDay[] = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
];
export const parseHtml = ($: CheerioStatic): Restaurant => {
  const menus = $("#todays-lunch li")
    .toArray()
    .map<RestaurantDayMenu>((dayNode, index) => {
      return {
        items: filterMap($("h3", dayNode).toArray(), (elem) => {
          if ($(elem).text() === "" || $(elem.next).text() === "") {
            return null;
          }
          return {
            name: $(elem.next).text(),
            title: $(elem).text().split("•")[0].trim(),
          };
        }),
        wday: weekdayTranslations[index],
      };
    });

  return { name: "Barabicu", url, days: menus };
};
