import { flatMap, includes, takeWhile, flatten } from "lodash-es";
import { id, isNotNull, isNotZero, isWeekday } from "../lib/utils";
import { FoodItem, Restaurant, WeekDay } from "../types";

export const url = "http://www.hopsbar.se/";

export const parseHtml = ($: CheerioStatic): Restaurant => {
  const menus = $("#Veckansmeny")
    .toArray()
    .map(item => {
      const allNodes = flatMap(item.childNodes, node =>
        $(node)
          .text()
          .trim()
          .split(/\n/)
      )
        .map(s => s.trim())
        .filter(id);

      const weekMealsStartIndex = allNodes.findIndex(
        text => text === "Veckans rätter"
      );

      const weekItems: FoodItem[] = takeWhile(
        allNodes.slice(weekMealsStartIndex + 1),
        text => !includes(text, " kaffe ")
      ).map(food => {
        const foodname = food.trim();
        const matches = foodname.split(':');

        if (matches.length > 1) {
          const [title, name] = matches;
          return { name: name.trim(), title: title.trim().toUpperCase() };
        }

        return { name: foodname };
      });

      const splitIndexes = allNodes
        .map((text, index) => (isWeekday(text) ? index : null))
        .filter(isNotNull);

      let lastIndex = 0;
      const days = splitIndexes
        .filter(isNotZero)
        .map(splitIndex => {
          const slice = allNodes.slice(lastIndex, splitIndex);
          lastIndex = splitIndex;
          return slice;
        })
        .concat([allNodes.slice(lastIndex)]);

      return days
        .filter(([wday]) => isWeekday(wday))
        .map(([wday, ...foods]) => {
          const items = foods.map(food => ({ name: food.trim() }));

          return {
            wday: wday as WeekDay,
            items: takeWhile(
              items,
              ({ name }) => name !== "Veckans rätter"
            ).concat(weekItems)
          };
        });
    });

  return { name: "Hops", url, days: flatten(menus) };
};
