var randomButton = document.querySelector('#random-button');
if (randomButton != null) {
  randomButton.parentNode.removeChild(randomButton);
}
function getEventHandlers(element) {
  for (var prop in leftMenu) {
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
  if (shift) {
    getEventHandlers(pageLink).onClick({ shiftKey: true });
  } else {
    pageLink.click();
  }
}
function createRandomButton() {
  var template = document.createElement('template');
  template.innerHTML = '<div id="random-button" class="log-button" href="#"><div class="flex-h-box" style="align-items:center;justify-content:space-between;"><span class="bp3-icon bp3-icon-random icon"></span>RANDOM</div></div>';
  template.content.firstChild.onclick = function(e) {
    if (window.location.hash.endsWith('/search')) {
      clickRandomPage(e.shiftKey);
    } else {
      goToAllPages();
      setTimeout(function() {
        clickRandomPage(e.shiftKey);
        if (e.shiftKey) { history.back(); }
      }, 1000);
    }
  }
  return template.content.firstChild;
}
const starred = document.querySelector('.starred-pages-wrapper');
document.querySelector('.roam-sidebar-content').insertBefore(createRandomButton(), starred);
