define('test-module',['rectangle'], function(rectangle) {
  return {
    test: () => {return 'this is a test'},
    Rectangle: rectangle.Rectangle
  }
});