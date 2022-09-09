const names = ["Hole-in-one!", "Eagle", "Birdie", "Par", "Bogey", "Double Bogey", "Go Home!"];

function golfScore(par, strokes) {
  // Only change code below this line
if (par == 1 ) {
  return "Hole-in-one!";
}
if (strokes >= 7 ) {
  return "Go Home!";
}
else if (strokes >= 6  ) {
  return "Double Bogey";
}
else if (strokes == par ) {
  return "Par";
}
else if (strokes != par && strokes >= 5 ) {
  return "Bogey";
}
else if (strokes >= 3 ) {
  return "Birdie";
}
else if (strokes >= 2 ) {
  return "Eagle";
}
else if (strokes == 1 ) {
  return "Hole-in-one!";
}
  // Only change code above this line
}
 
golfScore(5, 4);
