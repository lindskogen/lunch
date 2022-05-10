import { filterMap } from "../lib/utils";
import { Restaurant, RestaurantDayMenu, WeekDay } from "../types";

export const url = "https://barabicu.se/";

const weekdayTranslations: WeekDay[] = [
  WeekDay.Monday,
  WeekDay.Tuesday,
  WeekDay.Wednesday,
  WeekDay.Thursday,
  WeekDay.Friday,
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
