
var menuElements = ["content1", "content2"];

for (var i = 1; i < menuElements.length; i++) {
  var tmpElem = document.getElementById(menuElements[i]);
  console.log("tmp ", tmpElem)
  tmpElem.style.display = 'none';
}

function showMenuElem(id) {
    for (var i = 0; i < menuElements.length; i++) {
      var tmpElem = document.getElementById(menuElements[i]);
      console.log("tmp ", tmpElem)
      tmpElem.style.display = 'none';
  }
  if (id) {
    id.style.display = "block";
  }

}
