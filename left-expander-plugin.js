function leftExpanderPlugin() {
  
  function addHoverElement() {
    // cleanup old versions of the element
    var leftExpander = document.querySelector('#left-expander');
    if (leftExpander != null) {
      leftExpander.parentNode.removeChild(leftExpander);
    }
    // create element
    var template = document.createElement('template');
    template.innerHTML = '<span id="left-expander" style="position:absolute;height:100%;width:1em;position:absolute"></span>';
    leftExpander = template.content.firstChild;
    leftExpander.addEventListener('mouseenter', forwardMouseEnter);
    
    // insert element
    document.querySelector('.roam-main').parentElement.prepend(leftExpander);
  }
  
  function forwardMouseEnter() {
    const leftMenu = document.querySelector('.bp3-icon-menu');
    if (leftMenu) {
      leftMenu.dispatchEvent(new MouseEvent('mouseover', {'bubbles': true}));
    }
  }

  addHoverElement();
}
setTimeout(leftExpanderPlugin, 0);
