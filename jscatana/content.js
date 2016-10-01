function doTheThing() {
  var messages = document.getElementsByTagName('div');
  for (var i = 0, l = messages.length; i < l; i++) {
    if (!messages[i].innerHTML.includes("<div") && messages[i].innerHTML.includes("fuck you")) {
      var height = Math.round(Math.random()*400) + 10;
      var width = Math.round(Math.random()*300) + 10;
      messages[i].innerHTML = "This is great. Thank you for existing.<br><img src=\'http://placekitten.com/" + width + "/" + height + "\' />";
    }
  }
  setTimeout(function() {
    doTheThing();
  }, 10);
}
doTheThing();
