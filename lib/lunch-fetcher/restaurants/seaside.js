const _ = require("lodash");
const { isWeekday, isNotNull, isNotZero } = require("../lib/utils");

const url = "http://seaside.kvartersmenyn.se/";
module.exports.url = url;

module.exports.parseHtml = $ => {
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
          const parsedFoods = foods.map(food => {
            const res = /^([A-Ö]+( [0-9])?) ?:?([^0-9]*)/.exec(food);
            if (res) {
              const [all, title, number, name] = res;
              return { title, name: name.trim() };
            } else {
              return null;
            }
          });

          return {
            wday,
            items: parsedFoods
          };
        });
    });

  return { name: "Seaside", url, days: _.flatten(menus) };
};
