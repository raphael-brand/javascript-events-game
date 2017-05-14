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
    case "drag":
      var displayMode;
      checked ? displayMode = 1 : displayMode = 0;
      Array.from(document.querySelectorAll('.rectangle-outer'))[1].style.opacity = displayMode;
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