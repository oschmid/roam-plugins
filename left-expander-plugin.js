function leftExpanderPlugin() {
  
  function addHoverElement() {
    // cleanup old versions of the element
    var leftExpander = document.querySelector('#left-expander');
    if (leftExpander != null) {
      leftExpander.parentNode.removeChild(leftExpander);
    }
    // create element
    var template = document.createElement('template');
    template.innerHTML = '<span id="left-expander" style="height:100%;width:1em;position:absolute"></span>';
    leftExpander = template.content.firstChild;
    leftExpander.addEventListener('mouseenter', forwardMouseEnter);
    
    // insert element
    document.querySelector('.roam-body-main').prepend(leftExpander);
  }
  
  function forwardMouseEnter() {
    const leftMenu = document.querySelector('.bp3-icon-menu');
    if (leftMenu) {
      getEventHandlers(leftMenu).onMouseEnter();
    }
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
