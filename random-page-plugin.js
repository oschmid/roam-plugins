function randomPagePlugin() {
  function isMac() {
    return window.navigator.platform.startsWith('Mac');
  }
  
  // settings
  const title = 'Go to random page';
  const icon = 'bp3-button bp3-minimal bp3-icon-random pointer bp3-small';
  const shortcut = isMac() ? {ctrlKey: true, key: "r"} : {altKey: true, key: "r"};

  function addButton() {
    // cleanup old versions of the button
    var randomButton = document.querySelector('#random-button');
    if (randomButton != null) {
      randomButton.parentNode.removeChild(randomButton);
    }
    // create button
    var template = document.createElement('template');
    template.innerHTML = '<span id="random-button" title="' + title + '" class="' + icon + '"></span>';
    template.content.firstChild.onclick = goToRandomPage;
    randomButton = template.content.firstChild;
    
    // create spacer
    var spacer = document.querySelector('#random-spacer');
    if (spacer != null) {
      spacer.parentNode.removeChild(spacer);
    }
    template.innerHTML = 
      '<div class="log-button"><span id="random-button" class="' 
      + icon + '"></span>' + title + '</div>';
    spacer = template.content.firstChild;

    // insert button into topbar
    var nodes = document.querySelectorAll('.log-button');
	  var search = nodes[nodes.length-1];
    search.insertAdjacentElement('afterend', randomButton);
    search.insertAdjacentElement('afterend', spacer);
  }

  function addKeyboardShortcut() {
    document.onkeydown = function(e) {
      if (shortcut.ctrlKey && !e.ctrlKey) return;
      if (shortcut.shiftKey && !e.shiftKey) return;
      if (shortcut.altKey && !e.altKey) return;
      if (shortcut.key === e.key.toLowerCase()) {
        e.preventDefault();
        goToRandomPage(e);
      }
    }
  }

  function goToRandomPage(e) {
    const allPages = roamAlphaAPI.q('[ :find (pull ?e [:block/uid]) :where [?e :node/title]]');
    const page = getRandomElement(allPages);
    const uid = page[0].uid;
    const db = location.hash.split('/')[2];
    if (e.shiftKey) {
      roamAlphaAPI.ui.rightSidebar.addWindow({window:{type:'block','block-uid':uid}});
    } else {
      setTimeout(function(){location.assign('/#/app/' + db + '/page/' + uid);}, 0);
    }
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  addButton();
  addKeyboardShortcut();
}
setTimeout(randomPagePlugin, 0);
