import * as _ from "lodash";
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
      )
        .map(s => s.trim())
        .filter(id);

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
            items: _.takeWhile(items, ({ name }) => name !== "Veckans rätter")
          };
        });
    });

  return { name: "Hops", url, days: _.flatten(menus) };
};
