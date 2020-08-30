function leftExpanderPlugin() {
  
  function addHoverElement() {
    var leftExpander = document.querySelector('#left-expander');
    if (leftExpander != null) {
      leftExpander.parentNode.removeChild(leftExpander);
    }
    leftExpander = document.createElement('span');
    leftExpander.id = 'left-expander';
    leftExpander.style.height = '100%';
    leftExpander.style.width = '1em';
    leftExpander.style.position = 'absolute';
    leftExpander.addEventListener('mouseenter', function(e) {
      const leftMenu = document.querySelector('.bp3-icon-menu');
      if (!leftMenu) { return; }
      getEventHandlers(leftMenu).onMouseEnter();
    });
    document.querySelector('.roam-body-main').prepend(leftExpander);
  }

  function getEventHandlers(element) {
    for (var prop in element) {
      if (prop.includes('reactEventHandlers')) {
        return element[prop];
      }
    }
  }

  addHoverElement();
}
leftExpanderPlugin();
