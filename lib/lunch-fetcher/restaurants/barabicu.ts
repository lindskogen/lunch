import * as _ from "lodash";
import { isNotNull } from "../lib/utils";
import { FoodItem, Restaurant, WeekDay, RestaurantDayMenu } from "../types";

export const url = "https://barabicu.se/";

const weekdayTranslations: WeekDay[] = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag"
];
export const parseHtml = ($: CheerioStatic): Restaurant => {
  const menus = $("#todays-lunch li")
    .toArray()
    .map<RestaurantDayMenu>((dayNode, index) => {
      return {
        items: $("h3", dayNode)
          .toArray()
          .map<FoodItem | null>(elem => {
            if ($(elem).text() === '' || $(elem.next).text() === '') {
              return null;
            }
            return {
              name: $(elem.next).text(),
              title: $(elem).text().split('•')[0].trim()
            };
          }).filter(isNotNull),
        wday: weekdayTranslations[index]
      };
    });

  return { name: "Barabicu", url, days: menus };
};
