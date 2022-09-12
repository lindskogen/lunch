import { flatten } from "lodash-es";
import {
  filterMap,
  isNotZero,
  isWeekday,
  mapDayNameToWeekDay,
} from "../lib/utils";
import { Restaurant, WeekDay } from "../types";

export const url = "http://seaside.kvartersmenyn.se/";

export const parseHtml = ($: CheerioStatic): Restaurant => {
  const menus = $(".day .meny")
    .toArray()
    .map((item) => {
      const allNodes = item.childNodes
        .filter((i) => i.tagName === "strong" || i.nodeValue)
        .map((item) => $(item).text());

      const splitIndexes = filterMap(allNodes, (text, index) =>
        isWeekday(text) ? index : null
      );

      let lastIndex = 0;
      const days = splitIndexes
        .filter(isNotZero)
        .map((splitIndex) => {
          const slice = allNodes.slice(lastIndex, splitIndex);
          lastIndex = splitIndex;
          return slice;
        })
        .concat([allNodes.slice(lastIndex)]);

      return filterMap(days, ([wday, ...foods]) => {
        const weekday = mapDayNameToWeekDay(wday);

        if (!weekday) {
          return null;
        }

        const foodsRegex = /^([A-Ö]+( [0-9])?) ?[\n :]([^0-9:\n]+)/gm;

        const allFoodsForWeekDay = foods.join("\n");

        const parsedFoods = [];

        let res = foodsRegex.exec(allFoodsForWeekDay);
        while (res !== null) {
          const [, title, , name] = res;
          parsedFoods.push({ title, name: name.trim() });
          res = foodsRegex.exec(allFoodsForWeekDay);
        }

        return {
          wday: weekday,
          items: parsedFoods,
        };
      });
    });

  return { name: "Seaside", url, days: flatten(menus) };
};
