
var menuElements = ["content1", "content2"];

function showMenuElem(id) {

  console.log("id ", id)
  for (var i = 0; i < menuElements.length; i++) {
    console.log(menuElements[i]);
    var tmpElem = document.getElementById(menuElements[i]);
    // if (tmpElem) {
      console.log("tmp ", tmpElem)
      tmpElem.style.display = 'none';
    // }
  }
  console.log(id)
  if (id) {
    id.style.display = "block";
  }

}
