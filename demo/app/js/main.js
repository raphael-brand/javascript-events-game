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

function switchMode(mode, checked) {
  switch(mode) {
    case "toggleOpacity":
      var changeset = {
        display: !checked ? 'none' : 'block',
        opacity: !checked ? 0 : 1,
        delayedProperty: !checked ? 'display' : 'opacity',
        property: checked ? 'display' : 'opacity'
      };
        
      var el = Array.from(document.querySelectorAll('.rectangle-outer'))[1];
      var changeMode = (isChecked) => {
        el.style[changeset.delayedProperty] = changeset[changeset.delayedProperty];
      }

      el.style[changeset.property] = changeset[changeset.property];

      if(!checked)
        setTimeout(changeMode, 500, checked)
      else
        setTimeout(changeMode, 0, checked)

    break;
    }
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
  
  document.getElementsByClassName('rectangle-outer')[1].addEventListener('mousemove', function(event) {
      moveRect();
  });

  var ninth = Array.from(document.querySelectorAll('.ninth'));
  for(var el in ninth) {
    ninth[el].addEventListener('mousemove', hl_color);
    ninth[el].addEventListener('mouseout', rm_color);
  }
})