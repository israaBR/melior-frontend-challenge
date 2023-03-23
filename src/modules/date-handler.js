function isYearLeap(year) {
  return !(year % 4);
}
function getNumberOfDays(month, isYearLeap) {
  let numOfDays;
  if (month == 2) isYearLeap ? (numOfDays = 29) : (numOfDays = 28);
  else month % 2 == 0 ? (numOfDays = 30) : (numOfDays = 31);
  return numOfDays;
}
function calculateDuration(startDate, endDate) {
  let duration = { D: 0, M: 0, Y: 0 };
  duration.Y = endDate.$y - startDate.$y;

  if (endDate.$M < startDate.$M) {
    duration.M = 12 - startDate.$M + endDate.$M;
    duration.Y--;
  } else {
    duration.M = endDate.$M - startDate.$M;
  }
  if (endDate.$D < startDate.$D) {
    duration.M--;
    duration.D =
      getNumberOfDays(startDate.$M, isYearLeap(startDate.$y)) -
      startDate.$D +
      endDate.$D +
      1;
  } else if (endDate.$D == startDate.$D) {
    duration.D = 0;
  } else {
    duration.D = endDate.$D - startDate.$D + 1;
  }
  return duration;
}
function average(total, count) {
  return total / count;
}

module.exports = { isYearLeap, getNumberOfDays, calculateDuration, average };
