const ordinalNumbers = (n) => {
  n = n + 1;
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export default ordinalNumbers