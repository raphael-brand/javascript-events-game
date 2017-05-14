var rectDrags = false;
var target = null;
function hl_color(event) {
  event.target.classList.add('highlight');
}
function rm_color(event) {
  event.target.classList.remove('highlight');
}
function dragRect(event) {
  rectDrags = true;
  target = event.target;
  require(['test-module'], function(test) {
    console.log(test.test());
  });
}
function stopDragRect(event) {
  rectDrags = false;
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
  
  getDragLayer().addEventListener('mousemove', function(event) {
      moveRect();
  });

  switchMode(getDragLayer(), "toggleOpacity", false);

  var ninth = get9Grid();
  for(var el in ninth) {
    ninth[el].addEventListener('mousemove', hl_color);
    ninth[el].addEventListener('mouseout', rm_color);
  }
})