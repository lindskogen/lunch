const weekdaysSV = ["måndag", "tisdag", "onsdag", "torsdag", "fredag"];
const weekdaysUS = [
  null,
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  null
];

module.exports.weekdays = weekdaysUS;
module.exports.isWeekday = text => weekdaysSV.includes(text.toLowerCase());
module.exports.isNotNull = x => x !== null;
module.exports.isNotZero = x => x !== 0;
module.exports.id = x => x;
