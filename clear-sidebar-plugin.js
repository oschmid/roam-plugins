function clearSidebarPlugin() {
  // settings
  const shortcut = 67; // Alt+C
  
  function addButton() {
    // cleanup old versions of the button
    var clearButton = document.querySelector('#clear-button');
    if (clearButton != null) {
      clearButton.parentNode.removeChild(clearButton);
    }
    // create button
    var template = document.createElement('template');
    template.innerHTML = '<button id="clear-button" title="Clear All" class="bp3-button bp3-minimal bp3-small bp3-icon-standard bp3-icon-cross"></button>';
    template.content.firstChild.onclick = clearSidebar;
    clearButton = template.content.firstChild;
    
    // insert button into sidebar
    const sidebarMenu = document.querySelector('#right-sidebar .flex-h-box');
    sidebarMenu.appendChild(clearButton);
  }

  function addKeyboardShortcut() {
    document.onkeyup = function(e) {
      var key = e.which || e.keyCode;
      if (e.altKey && key === shortcut) {
        clearSidebar();
      }
    }
  }

  function clearSidebar() {
    document.querySelectorAll('.bp3-icon-cross').forEach(e => e.click());
  }

  addButton();
  addKeyboardShortcut();
}
setTimeout(clearSidebarPlugin, 1000);
