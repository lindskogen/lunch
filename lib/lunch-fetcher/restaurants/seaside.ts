import * as _ from "lodash";
import { isWeekday, isNotNull, isNotZero } from "../lib/utils";

export const url = "http://seaside.kvartersmenyn.se/";

export const parseHtml = ($: CheerioStatic): Restaurant => {
  const menus = $(".day .meny")
    .toArray()
    .map(item => {
      const allNodes = item.childNodes
        .filter(i => i.tagName === "strong" || i.nodeValue)
        .map(item => $(item).text());

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
          const parsedFoods = foods
            .map(food => {
              const res = /^([A-Ö]+( [0-9])?) ?:?([^0-9:]*)/.exec(food);
              if (res) {
                const [, title, , name] = res;
                return { title, name: name.trim() };
              } else {
                return null;
              }
            })
            .filter(isNotNull);

          return {
            wday: wday as WeekDay,
            items: parsedFoods
          };
        });
    });

  return { name: "Seaside", url, days: _.flatten(menus) };
};
