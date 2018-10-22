const _ = require("lodash");
const { isWeekday, isNotNull, isNotZero, id } = require("../lib/utils");

module.exports.parseHtml = $ => {
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
          wday,
          items: _.take(foods.map(food => ({ name: food.trim() })), 2)
        }));
    });

  return { name: "Hops", days: menus };
};
