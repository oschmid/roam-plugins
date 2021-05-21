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
    document.onkeyup = async function(e) {
      var key = e.which || e.keyCode;
      if (e.altKey && key === shortcut) {
        await clearSidebar();
      }
    }
  }

  async function clearSidebar() {
    var x;
    while ((x = document.querySelector('.bp3-icon-cross:not(#clear-button)')) !== null) {
      x.click();
      await new Promise(r => setTimeout(r, 0)); // let Roam re-render before deleting next block
    }
  }

  addButton();
  addKeyboardShortcut();
}
setTimeout(clearSidebarPlugin, 0);
