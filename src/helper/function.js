const hourToSecond = 3600;
const minuteToSecond = 60;

export function timeToString(time) {
  if (parseInt(time) < 10) {
    time = addZeroPrefix(time);
  }

  return time;
}

export function addZeroPrefix(number) {
  return ("0" + number).slice(-2);
}

export function timeToSecond(time) {
  return (
    parseInt(time.second * hourToSecond) +
    parseInt(time.minute * minuteToSecond) +
    parseInt(time.second)
  );
}

export function secondToTime(second) {
  let hour = 0;
  let minute = 0;
  let sec = 0;

  if (second >= hourToSecond) {
    hour = Math.floor(second / hourToSecond);
  }

  sec = second - hour * hourToSecond;

  if (sec >= minuteToSecond) {
    minute = Math.floor(sec / minuteToSecond);
  }

  sec = sec - minute * minuteToSecond;

  return {
    hour,
    minute,
    sec
  };
}

export function processTime(time) {
  let hour = parseInt(time.hour);
  let minute = parseInt(time.minute);
  let second = parseInt(time.second);

  if (second > minuteToSecond) {
    second = convertToBiggerUnit(second);
    minute = second.converted + minute;
    second = second.remaining;
  }

  if (minute > minuteToSecond) {
    minute = convertToBiggerUnit(minute);
    hour = minute.converted + hour;
    minute = minute.remaining;
  }

  return { hour, minute, second };
}

export function convertToBiggerUnit(time) {
  let biggerUnitTime = Math.floor(time / minuteToSecond);

  return {
    remaining: time - biggerUnitTime * minuteToSecond,
    converted: biggerUnitTime
  };
}