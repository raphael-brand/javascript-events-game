define('rectangle', function() {

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
    this.width = width;
    this.height = height;

    this.setPoints = function(pts) {
      this.points = new Object(pts);
      this.a = pts.a;
      this.b = pts.b;
      this.c = pts.c;
      this.d = pts.d;
    }

    this.setPoints(points);
    
    this.getRect = function () {
      var points = this.points;
      return {
        points, width, height
      };
    }
  }

  return {
    Rectangle: Rectangle    
  }
});
