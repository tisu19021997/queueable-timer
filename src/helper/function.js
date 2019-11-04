const hourToSecond = 3600;
const minuteToSecond = 60;

// Add the zero prefix for time, for example: "7" into "07"
/**
 *
 * @param {} time
 */
export function addZeroPrefix(time) {
  return (`0${time}`).slice(-2);
}

/**
 * Convert unit of time to string.
 *
 * @param {string|number} unitOfTime Unit of time to convert
 * @param {boolean} zeroPrefix Whether to add zero prefix or not
 */
export function timeUnitToStr(unitOfTime, zeroPrefix = true) {
  let timeUnit = unitOfTime;

  if (parseInt(unitOfTime, 10) < 10 && zeroPrefix) {
    timeUnit = addZeroPrefix(unitOfTime);
  }

  return timeUnit;
}

/**
 * Convert time object to string with the format hh:mm:ss
 *
 * @param {object} time The time object
 */
export function timeToStr(time) {
  return `${timeUnitToStr(time.hour)} : ${timeUnitToStr(time.minute)} : ${timeUnitToStr(time.second)}`;
}

/**
 * Convert an amount of seconds to time object
 *
 * @param {number} second The amount of seconds to convert
 */
export function secondToTime(second) {
  let hour = 0;
  let minute = 0;
  let sec = 0;

  if (second >= hourToSecond) {
    // divide the second by 3600 and take the integer part
    hour = Math.floor(second / hourToSecond);
  }

  // calculate the amount of seconds that can not be converted to hour
  sec = second - hour * hourToSecond;

  // do the same for the minute party
  if (sec >= minuteToSecond) {
    minute = Math.floor(sec / minuteToSecond);
  }

  sec -= minute * minuteToSecond;

  return {
    hour,
    minute,
    second: sec,
  };
}

/**
 * Convert time object into seconds
 *
 * @param {object} time The time object
 */
export function timeToSecond(time) {
  return (
    parseInt(time.hour * hourToSecond, 10)
    + parseInt(time.minute * minuteToSecond, 10)
    + parseInt(time.second, 10)
  );
}

/**
 * Convert smaller time unit to one level larger time unit.
 *
 * @param {number} time Time to convert
 */
export function toOneBiggerUnit(time) {
  const biggerUnitTime = Math.floor(time / minuteToSecond);

  return {
    remaining: time - biggerUnitTime * minuteToSecond,
    converted: biggerUnitTime,
  };
}

/**
 * Normalize the time.
 *
 * @param {object} time The time Object
 */
export function normalizeTime(time) {
  let hour = parseInt(time.hour, 10);
  let minute = parseInt(time.minute, 10);
  let second = parseInt(time.second, 10);

  if (second >= minuteToSecond) {
    second = toOneBiggerUnit(second);
    minute = second.converted + minute;
    second = second.remaining;
  }

  if (minute >= minuteToSecond) {
    minute = toOneBiggerUnit(minute);
    hour = minute.converted + hour;
    minute = minute.remaining;
  }

  return { hour, minute, second };
}
