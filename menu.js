
var menuElements = ["content1", "content2", "content3", "content4"];

for (var i = 1; i < menuElements.length; i++) {
  var tmpElem = document.getElementById(menuElements[i]);
  tmpElem.style.display = 'none';
}

function showMenuElem(id) {
  for (var i = 0; i < menuElements.length; i++) {
    var tmpElem = document.getElementById(menuElements[i]);
    tmpElem.style.display = 'none';
  }
  if (id) {
    id.style.display = "block";
  }

}
