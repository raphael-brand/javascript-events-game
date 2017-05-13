var rectDrags = false;
var target = null;
function dragRect(event) {
  event.dataTransfer.setData("text", event.target.id);
  rectDrags = true;
  target = event.target;
  require(['test-module'], function(test) {
    console.log(test.test());
  });
}
function stopDragRect(event) {

  event.preventDefault();
  console.log(window.pageX);
  document.querySelector('.two').style.left = event.target.clientX + 'px';
  //document.querySelector('.one').style.top = target.style.top + 'px';
  event.target.style.top;

  rectDrags = false;
}

function moveRect(x,y) {

  if(rectDrags) {
    target.style.backgroundColor = '#fa0';
    target.style.left = x + 'px';
    target.style.top = y + 'px';
  }
  else if(target){
    target.style.backgroundColor = 'transparent';
    target = null;
  }
}

window.addEventListener('mousemove', function(event) {
    moveRect(event.clientX, event.clientY);
});