import * as _ from "lodash";
import { id, isNotNull, isNotZero, isWeekday } from "../lib/utils";
import { FoodItem, Restaurant, WeekDay } from "../types";

export const url = "http://www.hopsbar.se/";

export const parseHtml = ($: CheerioStatic): Restaurant => {
  const menus = $("#Veckansmeny")
    .toArray()
    .map(item => {
      const allNodes = _.flatMap(item.childNodes, node =>
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

      const weekItems: FoodItem[] = _.takeWhile(
        allNodes.slice(weekMealsStartIndex + 1),
        text => !_.includes(text, " kaffe ")
      ).map(food => {
        const foodname = food.trim();
        const matches = foodname.split(':');

        if (matches.length > 1) {
          const [title, name] = matches;
          return { name: name.trim(), title: title.trim() };
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
            items: _.takeWhile(
              items,
              ({ name }) => name !== "Veckans rätter"
            ).concat(weekItems)
          };
        });
    });

  return { name: "Hops", url, days: _.flatten(menus) };
};
