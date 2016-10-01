"use strict";


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

function replaceSwearWord(phrase) {
  var fuckRegex = /[fF]+[uU]+[cC]+[kK]+|[sS]+[hH]+[!1iI]+[tT]+|[bB]+[!1iI]+[tT]+[cC]+[hH]+|[@aA]+[5sS]+|[5sS]+[lL]+[uU]+[tT]+|[pP]+[iI]+[sS]+|[dD]+[!1iI]+[cC]+[kK]+|[fF]+[aA@]+[gG]+/g;
  return phrase.replace(fuckRegex, "LOVE");
}

function containsSwearWord(phrase) {
  var fuckRegex = /[fF]+[uU]+[cC]+[kK]+|[sS]+[hH]+[!1iI]+[tT]+|[bB]+[!1iI]+[tT]+[cC]+[hH]+|[@aA]+[5sS]+|[5sS]+[lL]+[uU]+[tT]+|[pP]+[iI]+[sS]+|[dD]+[!1iI]+[cC]+[kK]+|[fF]+[aA@]+[gG]+/g;
  return fuckRegex.test(phrase);
}

function watsonCallback(score, node) {
  if (score * 100 > 50) {
    var myCat = document.createElement("IMG");
    var height = Math.round(Math.random() * 300) + 100;
    var width = Math.round(Math.random() * 200) + 100;
    myCat.src = "http://placekitten.com/" + width + "/" + height;
    node.parentElement.appendChild(myCat);
    node.id = "fuckitty";
    node.nodeValue = replaceSwearWord(node.nodeValue);
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
  var textNodes = textNodesUnder(document.body);
  textNodes.forEach(function (node) {
    var lower = node.textContent.toLowerCase();
    var elem = document.activeElement
    if (!isInElement(node, elem) && elem.id != "fuckitty" && containsSwearWord(lower)) {
      return watson(lower, node);
    }
  });
  setTimeout(function () {
    run();
  }, 1000);
}
window.onload = function() {
  run();
};

