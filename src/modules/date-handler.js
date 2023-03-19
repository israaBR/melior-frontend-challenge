function isYearLeap(year) {
  return year % 4;
}
function getNumberOfDays(month, isYearLeap) {
  let numOfDays;
  if (month == 2) isYearLeap ? (numOfDays = 29) : (numOfDays = 28);
  else month % 2 == 0 ? (numOfDays = 30) : (numOfDays = 31);
  return numOfDays;
}

module.exports = { isYearLeap, getNumberOfDays };
