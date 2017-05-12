function Helper(width, height, x, y) {
  var width =  width;
  var height = height;
  var px = x;
  var py = y;
  var direction = new Object({ x: 1, y: 1 });
  var speed = 10;

  this.move = function () {
    console.log(px, height)
    px += speed * direction.x;
    py += speed * direction.y;
  }

  this.x = function() {
    return px;
  }
  this.y = function() {
    return py;
  }
  this.width = function() {
    return width;
  }
  this.height = function() {
    return height;
  }

  this.setDirection = function (x, y) {
    if (x)
      direction.x = x;
    if (y)
      direction.y = y;
  }
}

var helper1 = new Helper(200, 200, 0, 0);
var helper2 = new Helper(40, 50, 300, 0);


helper2.setDirection(-1);
var moveB = setInterval(helper2.move, 200);
var hittest = setInterval(hitTest, 200, helper1, helper2)

function hitTest(A, B) {
  if (A.x() + A.width() >= B.x()) {
    console.log('#')
  }
}