export const getNextDayOfWeek = (dayName, excludeToday = true, refDate = new Date()) => {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    .indexOf(dayName.slice(0, 3).toLowerCase());
  if (dayOfWeek < 0) return null;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(
    refDate.getDate()
    + !!excludeToday
    + ((dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7),
  );
  return refDate;
};

export const getDayOfNextWeekWithTime = (dayName, hours, minutes, seconds) => {
  const nextSunday = getNextDayOfWeek("sunday", false);
  const nextDay = getNextDayOfWeek(dayName, true, nextSunday);
  nextDay.setHours(hours, minutes, seconds);
  return nextDay;
};

export const now = () => Date.now();
