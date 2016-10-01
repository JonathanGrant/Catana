"use strict";

function getUserScore(userId) {
  var requestData = { "operation": "read", "tableName": "AddMeUsers", "payload": { "Key": { "userid": userId } } };
  $.ajax({
    url: "https://rdsmefueg6.execute-api.us-east-1.amazonaws.com/prod",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(requestData),
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader("x-api-key", awsKey);
    },
    success: function success(data, status, jq) {
      return data["Item"].bullyscore;
    }
  });
}

function updateAWS(newScore, userId) {
  var requestData = { "operation": "update", "tableName": "AddMeUsers", "payload": { "Key": { "userid": userId }, "UpdateExpression": "set bullyscore = :ns", "ExpressionAttributeValues": { ":ns": newScore } } };
  $.ajax({
    url: "https://rdsmefueg6.execute-api.us-east-1.amazonaws.com/prod",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(requestData),
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader("x-api-key", awsKey);
    },
    success: function success(data, status, jq) {
      console.log(data, status, jq);
    }
  });
}

function watson(phrase, node) {
  var myUrl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=" + phrase;
  $.ajax({
    url: myUrl,
    type: "GET",
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa("2a460659-2311-4613-8f63-467520c31e24:gLzfrrMv5a4q"));
    },
    success: function success(data, status, jq) {
      if (data != undefined) {
        var tones = data["document_tone"].tone_categories[0].tones;
        for (var i = 0; i < tones.length; i++) {
          if (tones[i].tone_name == "Anger") {
            watsonCallback(tones[i].score, node);
          }
        }
      }
    }
  });
}

function watsonCallback(score, node) {
  if (score * 100 > 50) {
    // console.log(score);
    console.log(updateAWS("420", "JonnyIsCoo1"));
    getUserScore("JonnyIsCoo1");
    var myCat = document.createElement("IMG");
    var height = Math.round(Math.random() * 300) + 100;
    var width = Math.round(Math.random() * 200) + 100;
    myCat.src = "http://placekitten.com/" + width + "/" + height;
    node.parentElement.appendChild(myCat);
    node.nodeValue = node.nodeValue.replace(/fuck/g, "love").replace(/Fuck/g, "Love").replace(/shit/g, "amazing").replace(/Shit/g, "Amazing").replace(/bitch/g, "beautiful person").replace(/Bitch/g, "Beautiful person").replace(/piss off/g, "thank you").replace(/Piss off/g, "Thank you").replace(/piss/g, "great").replace(/Piss/g, "Great");
  }
  return node;
}
function textNodesUnder(element) {
  var node = void 0;
  var textNodes = [];
  var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

  while (node = walker.nextNode()) {
    textNodes.push(node);
  }

  return textNodes;
}

function isInElement(node, elem) {
  var nodeInElem = false;
  for (var i = 0, len = elem.childNodes.length; i < len; i++) {
    if (elem.childNodes[i] == node) {
      nodeInElem = true;
      return nodeInElem;
    }
  }

  for (var i = 0, len = elem.childNodes.length; i < len; i++) {
    nodeInElem = isInElement(node, elem.childNodes[i])
    if (nodeInElem == true) {
      return nodeInElem;
    }
  }

  return nodeInElem;
}

function run() {
  console.log("ya running");
  var textNodes = textNodesUnder(document.body);
  textNodes.forEach(function (node) {
    var lower = node.textContent.toLowerCase();
    if (!isInElement(node, elem) && (lower.includes("fuck") || lower.includes("shit") || lower.includes("bitch") || lower.includes("piss"))) {
      return watson(lower, node);
    }
  });
  setTimeout(function () {
    run();
  }, 100);
}
window.onload = function() {
  run();
};

