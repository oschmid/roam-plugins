var randomButton = document.querySelector('#random-button');
if (randomButton != null) {
  randomButton.parentNode.removeChild(randomButton);
}
function getEventHandlers(element) {
  for (var prop in element) {
    if (prop.includes('reactEventHandlers')) {
      return element[prop];
    }
  }
}
function goToAllPages() {
  document.querySelector('.bp3-icon-list').parentNode.parentNode.click();
}
function clickRandomPage(shift) {
  // https://forum.roamresearch.com/t/what-would-be-your-top-3-tips-for-beginners/255/9
  var allpages = document.querySelectorAll('div.rm-pages-title-col a');
  var pageLink = allpages[Math.floor(Math.random()*allpages.length)];
  getEventHandlers(pageLink).onClick({ shiftKey: shift });
}
function isAllPages() {
  return location.hash.endsWith('/search');
}
function goToRandomPage(e) {
  if (isAllPages()) {
    clickRandomPage(e.shiftKey);
  } else if (e.shiftKey) {
    goToAllPages();
    setTimeout(function() {
      clickRandomPage(e.shiftKey);
      history.back();
    }, 500);
  } else {
    const pages = roamAlphaAPI.q('[ :find (pull ?e [:block/uid]) :where [?e :node/title]]');
    const page = pages[Math.floor(Math.random()*pages.length)];
    const uid = page[0].uid;
    const db = location.hash.split('/')[2];
    location.assign('/#/app/' + db + '/page/' + uid);
  }
}
function createRandomButton() {
  var template = document.createElement('template');
  template.innerHTML = '<div id="random-button" class="log-button" href="#"><div class="flex-h-box" style="align-items:center;justify-content:space-between;"><span class="bp3-icon bp3-icon-random icon"></span>RANDOM</div></div>';
  template.content.firstChild.onclick = goToRandomPage;
  return template.content.firstChild;
}
const starred = document.querySelector('.starred-pages-wrapper');
document.querySelector('.roam-sidebar-content').insertBefore(createRandomButton(), starred);
document.onkeyup = function(e) {
  var key = e.which || e.keyCode;
  if (e.altKey && key === 82 /* Alt+R */) {
    goToRandomPage(e);
  }
}