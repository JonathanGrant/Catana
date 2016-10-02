'use strict';

$(document).ready(function () {
    $("#angerS").slider();
    $("#angerS").on("slide", function(slideEvt) {
    $("#anger").text("Anger: " + slideEvt.value);
  });
});

$(document).ready(function () {
    $("#disgustS").slider();
    $("#disgustS").on("slide", function(slideEvt) {
    $("#disgust").text("Anger: " + slideEvt.value);
  });
});
