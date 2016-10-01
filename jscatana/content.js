function doTheThing() {
  var messages = document.getElementsByTagName('div');
  for (var i = 0, l = messages.length; i < l; i++) {
    if (!messages[i].innerHTML.includes("<div") && messages[i].innerHTML.includes("fuck you")) {
      messages[i].innerHTML = "This is great. Thank you for existing. <img src=\'http://placekitten.com/420/420\' />";
    }
  }
  setTimeout(function() {
    doTheThing();
  }, 10);
}
doTheThing();
