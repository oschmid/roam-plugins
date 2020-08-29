// settings
const title = 'RANDOM';
const icon = 'bp3-icon bp3-icon-random icon';
const shortcut = 82; // Alt+R
const timeout = 500; // ms

function addButton() {
  // cleanup old versions of the button
  var randomButton = document.querySelector('#random-button');
  if (randomButton != null) {
    randomButton.parentNode.removeChild(randomButton);
  }
  // create button
  var template = document.createElement('template');
  template.innerHTML = '<div id="random-button" class="log-button" href="#"><div class="flex-h-box" style="align-items:center;justify-content:space-between;"><span class="' + icon + '"></span>' + title + '</div></div>';
  template.content.firstChild.onclick = goToRandomPage;
  randomButton = template.content.firstChild;
  
  // insert button into sidebar
  const starred = document.querySelector('.starred-pages-wrapper');
  document.querySelector('.roam-sidebar-content').insertBefore(randomButton, starred);
}

function addKeyboardShortcut() {
  document.onkeyup = function(e) {
    var key = e.which || e.keyCode;
    if (e.altKey && key === shortcut) {
      goToRandomPage(e);
    }
  }
}

function goToRandomPage(e) {
  if (isAllPages()) {
    clickRandomPageLink(e.shiftKey);
  } else if (e.shiftKey) {
    goToAllPages();
    setTimeout(function() {
      clickRandomPageLink(e.shiftKey);
      history.back();
    }, timeout);
  } else {
    const allPages = roamAlphaAPI.q('[ :find (pull ?e [:block/uid]) :where [?e :node/title]]');
    const page = getRandomElement(allPages);
    const uid = page[0].uid;
    const db = location.hash.split('/')[2];
    location.assign('/#/app/' + db + '/page/' + uid);
  }
}

function isAllPages() {
  return location.hash.endsWith('/search');
}

function goToAllPages() {
  document.querySelector('.bp3-icon-list').parentNode.parentNode.click();
}

function clickRandomPageLink(shift) {
  // https://forum.roamresearch.com/t/what-would-be-your-top-3-tips-for-beginners/255/9
  var allPages = document.querySelectorAll('div.rm-pages-title-col a');
  var pageLink = getRandomElement(allPages);
  getEventHandlers(pageLink).onClick({ shiftKey: shift });
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getEventHandlers(element) {
  for (var prop in element) {
    if (prop.includes('reactEventHandlers')) {
      return element[prop];
    }
  }
}

addButton();
addKeyboardShortcut();
