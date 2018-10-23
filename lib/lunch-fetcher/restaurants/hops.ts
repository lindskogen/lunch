import _ from "lodash";
import { isWeekday, isNotNull, isNotZero, id } from "../lib/utils";

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
      ).filter(id);

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
        .map(([wday, ...foods]) => ({
          wday: wday as WeekDay,
          items: _.take(foods.map(food => ({ name: food.trim() })), 2)
        }));
    });

  return { name: "Hops", url, days: _.flatten(menus) };
};
