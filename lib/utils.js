const weekdays = ["måndag", "tisdag", "onsdag", "torsdag", "fredag"];

module.exports.isWeekday = text => weekdays.includes(text.toLowerCase());
module.exports.isNotNull = x => x !== null;
module.exports.isNotZero = x => x !== 0;
module.exports.id = x => x;
