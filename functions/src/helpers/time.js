"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.now = exports.getDayOfNextWeekWithTime = exports.getNextDayOfWeek = void 0;

var getNextDayOfWeek = function getNextDayOfWeek(dayName) {
  var excludeToday = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var refDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
  var dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(dayName.slice(0, 3).toLowerCase());
  if (dayOfWeek < 0) return null;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(refDate.getDate() + !!excludeToday + (dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7);
  return refDate;
};

exports.getNextDayOfWeek = getNextDayOfWeek;

var getDayOfNextWeekWithTime = function getDayOfNextWeekWithTime(dayName, hours, minutes, seconds) {
  var nextSunday = getNextDayOfWeek("sunday", false);
  var nextDay = getNextDayOfWeek(dayName, true, nextSunday);
  nextDay.setHours(hours, minutes, seconds);
  return nextDay;
};

exports.getDayOfNextWeekWithTime = getDayOfNextWeekWithTime;

var now = function now() {
  return Date.now();
};

exports.now = now;