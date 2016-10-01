function doTheThing() {
  var messages = document.getElementsByTagName('div');
  for (var i = 0, l = messages.length; i < l; i++) {
    if (!messages[i].innerHTML.includes("<div") && messages[i].innerHTML.includes("fuck you")) {
      var bullyId = document.URL.split("/t/")[1];
      console.log(bullyId);
      var height = Math.round(Math.random()*300) + 100;
      var width = Math.round(Math.random()*200) + 100;
      messages[i].innerHTML = "Thank you for existing. Here's a cat, just for you!<img src=\'http://placekitten.com/" + width + "/" + height + "\' />";
    }
  }
  setTimeout(function() {
    doTheThing();
  }, 10);
}
doTheThing();


// var bullyName = messages[i].parentElement.parentElement.innerHTML.split("_3oh-\">")[1].split("<")[0];
// console.log(bullyName);