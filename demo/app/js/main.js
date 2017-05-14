var rectDrags = false;
var target = null;
function hl_color(event) {
  event.target.classList.add('highlight');
}
function rm_color(event) {
  event.target.classList.remove('highlight');
}

// declare Rectangle instance variables
// loaded from test-module 'Rectangle'
var 
    r1, // target div
    r2; // draggable div

function dragRect(event) {


  rectDrags = true;
  target = event.target;

  require(['test-module'], function(geom) {
    var draggableDiv, x, y;
    draggableDiv = target;

    x = draggableDiv.offsetLeft;
    y = draggableDiv.offsetTop;

    r2 = new geom.Rectangle(draggableDiv.offsetWidth, draggableDiv.offsetHeight, x, y);
    console.log(r2);
    console.groupEnd();
  });

  
}

function onEnterTarget(event) {
  rectDrags = false;
  console.log(event);
}

function onDrag(e) {

    var pts = {
      a: [e.screenX, e.screenY],
      b: [e.screenX + r2.width, e.screenY],
      c: [e.screenX, e.screenY + r2.height],
      d: [e.screenX + r2.width, e.screenY + r2.height]
    }

    r2.setPoints(pts);
}

function getRectangle(e) {
  if(rectDrags) {
    e.preventDefault();

    onDrag(e); // register new position a last time
    console.dir(r2.getRect())
    // check which corner of the draggable is within the droppable

    rectDrags = false;
  }
}

function get9Grid() {
  return Array.from(document.querySelectorAll('.ninth'));
}

function getDragLayer() {
  return Array.from(document.querySelectorAll('.rectangle-outer'))[1];
}

var isSwitching = false;

function switchMode(targetElement, mode, checkbox) {
  if(isSwitching) return;
  var checked = checkbox.checked;

  switch(mode) {
    case "toggleOpacity":
      var changeset = {
        display: !checked ? 'none' : 'block',
        opacity: !checked ? 0 : 1,
        delayedProperty: !checked ? 'display' : 'opacity',
        property: checked ? 'display' : 'opacity'
      };
    break;
  }

  var switching = isSwitching = checkbox.disabled = true;
  var el = targetElement;
  var changeMode = (checkbox) => {
    el.style[changeset.delayedProperty] = changeset[changeset.delayedProperty];
    switching = isSwitching = checkbox.disabled = false;
  }

  el.style[changeset.property] = changeset[changeset.property];

  if(!checked)
    setTimeout(changeMode, 500, checkbox)
  else
    setTimeout(changeMode, 0, checkbox)

}

function moveRect() {
  if(rectDrags)
    target.style.backgroundColor = '#fa0';
  else if(target){
    target.style.backgroundColor = 'transparent';
    target = null;
  }
}


window.addEventListener('load', function() {
  
  /*getDragLayer().addEventListener('mousemove', function(event) {
      moveRect();
  });
  */
  var dragLayer = getDragLayer();
  switchMode(dragLayer, "toggleOpacity", false);

  var ninth = get9Grid();
  for(var el in ninth) {
    ninth[el].addEventListener('mousemove', hl_color);
    ninth[el].addEventListener('mouseout', rm_color);
  }

  require(['test-module'], function(geom) {
    var x, y, targetDiv;
    
    targetDiv = document.querySelector('.centerMiddle', get9Grid());
    
    x = targetDiv.offsetLeft;
    y = targetDiv.offsetTop;

    r1 = new geom.Rectangle(targetDiv.offsetWidth, targetDiv.offsetHeight, x, y);
    console.group('Rectangle Instances:');
    console.dir(r1);
    // adding copy of targetDiv
    // to the drop zone layer 
    var copyTarget = document.querySelector('.centerMiddle', get9Grid()).cloneNode();
    copyTarget.style.top = r1.a[1] + 'px';
    copyTarget.style.left = r1.a[0] + 'px';
    copyTarget.style.position = 'absolute';
    //copyTarget.classList.add()
    dragLayer.appendChild(copyTarget);
    //
  });
})
