"use strict";

function getUserScore(userId) {
  var requestData = {"operation": "read","tableName": "AddMeUsers","payload": {"Key": {"userid": userId}}};
  $.ajax({
    url : "https://rdsmefueg6.execute-api.us-east-1.amazonaws.com/prod",
    type: "POST",
    dataType : "json",
    data: JSON.stringify(requestData),
    beforeSend: function(xhr){xhr.setRequestHeader("x-api-key", awsKey);},  
    success: function(data, status, jq) {
      return data["Item"].bullyscore;
    }
  });
}

function updateAWS(newScore, userId) {
  var requestData = {"operation": "update","tableName": "AddMeUsers","payload": {"Key": {"userid": userId},"UpdateExpression": "set bullyscore = :ns","ExpressionAttributeValues": {":ns": newScore}}};
  $.ajax({
    url : "https://rdsmefueg6.execute-api.us-east-1.amazonaws.com/prod",
    type: "POST",
    dataType : "json",
    data: JSON.stringify(requestData),
    beforeSend: function(xhr){xhr.setRequestHeader("x-api-key", awsKey);},  
    success: function(data, status, jq) {
      console.log(data, status, jq);
    }
  });
}

function watson(phrase) {
  var url = "https://gateway.watsonplatform.net/tone-analyzer/api/v3";
}

function textNodesUnder(element) {
  let node;
  let textNodes = [];
  let walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (node = walker.nextNode()) {
    textNodes.push(node);
  }

  return textNodes;
}

function run() {
  let textNodes = textNodesUnder(document.body);
  textNodes.forEach(function(node) {
    var lower = node.textContent.toLowerCase();
    if (lower.includes("fuck") || lower.includes("shit") || lower.includes("bitch") || lower.includes("piss")) {
      console.log(updateAWS("420", "JonnyIsCoo1"));
      getUserScore("JonnyIsCoo1");
      var myCat = document.createElement("IMG");
      var height = Math.round(Math.random()*300) + 100;
      var width = Math.round(Math.random()*200) + 100;
      myCat.src = "http://placekitten.com/" + width + "/" + height;
      node.parentElement.appendChild(myCat)
      node.nodeValue = node.
                         nodeValue.
                         replace(/fuck/g, "love").
                         replace(/Fuck/g, "Love").
                         replace(/shit/g, "amazing").
                         replace(/Shit/g, "Amazing").
                         replace(/bitch/g, "beautiful person").
                         replace(/Bitch/g, "Beautiful person").
                         replace(/piss off/g, "thank you").
                         replace(/Piss off/g, "Thank you").
                         replace(/piss/g, "great").
                         replace(/Piss/g, "Great")
      }
      return node;
  });
  setTimeout(function() {
    run();
  }, 10);
}
run();