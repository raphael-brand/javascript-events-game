var Rectangle = function (width, height, x, y) {

  !x && (x = 0);
  !y && (y = 0);

  var points = {
    "a": [x, y],
    "b": [x + width, y],
    "c": [x, y + height],
    "d": [x + width, y + height]
  }

  this.points = points;

  this.getRect = function () {
    return this.points;
  }
}
module.exports = {Rectangle};