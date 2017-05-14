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

function moveRect() {
  if(rectDrags)
    target.style.backgroundColor = '#fa0';
  else if(target){
    target.style.backgroundColor = 'transparent';
    target = null;
  }
}

window.addEventListener('mousemove', function() {
    moveRect();
});

window.addEventListener('load', function() {
  var ninth = Array.from(document.querySelectorAll('.ninth'));

  for(var el in ninth) {
    ninth[el].addEventListener('mousemove', hl_color);
    ninth[el].addEventListener('mouseout', rm_color);
  }
})
