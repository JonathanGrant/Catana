'use strict';

// require.config({
//   baseUrl: "scripts"
// });
// var request = require('request');

// function getUserScore(userId) {
//   var requestData = {
//     'operation': 'read',
//     'tableName': 'AddMeUsers',
//     'payload': {
//       'Key': {
//           'userid': userId
//       }
//     }
//   }
//   request({
//     url: 'https://rdsmefueg6.execute-api.us-east-1.amazonaws.com/prod',
//     method: 'POST',
//     json: true,
//     headers: {
//         'content-type': 'application/json',
//         'x-api-key': process.env.API_KEY,
//     },
//     body: requestData
//   }, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       console.log('200: ', body)
//     }
//     else {
//       console.log('error: ' + error)
//       console.log('response.statusCode: ' + response.statusCode)
//       console.log('response.statusText: ' + response.statusText)
//     }
//   });
// }

// function updateAWS(newScore, userId) {
//   var requestData = {
//     'operation': 'update',
//     'tableName': 'AddMeUsers',
//     'payload': {
//       'Key': {
//           'userid': '6093044061'
//       },
//       'UpdateExpression': 'set igid = :id, ig_access = :ac',
//       'ExpressionAttributeValues': {
//         ':id': jsonBody.user.id,
//         ':ac': jsonBody.access_token
//       }
//     }
//   }
//   request({
//     url: 'https://rdsmefueg6.execute-api.us-east-1.amazonaws.com/prod',
//     method: 'POST',
//     json: true,
//     headers: {
//         'content-type': 'application/json',
//         'x-api-key': process.env.API_KEY,
//     },
//     body: requestData
//   }, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       console.log('200: ', body)
//     }
//     else {
//       console.log('error: ' + error)
//       console.log('response.statusCode: ' + response.statusCode)
//       console.log('response.statusText: ' + response.statusText)
//     }
//   });
// }

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
  // getUserScore('6507993840');
  let textNodes = textNodesUnder(document.body);
  textNodes.forEach(function(node) {
    var lower = node.textContent.toLowerCase();
    if (lower.includes('fuck') || lower.includes('shit')) {
      var myCat = document.createElement('IMG');
      var height = Math.round(Math.random()*300) + 100;
      var width = Math.round(Math.random()*200) + 100;
      myCat.src = 'http://placekitten.com/' + width + '/' + height;
      node.parentElement.appendChild(myCat)
      node.nodeValue = node.
                         nodeValue.
                         replace(/fuck/g, 'love').
                         replace(/Fuck/g, 'Love').
                         replace(/shit/g, 'amazing').
                         replace(/Shit/g, 'Amazing').
                         replace(/bitch/g, 'beautiful person').
                         replace(/Bitch/g, 'Beautiful person').
                         replace(/piss off/g, 'thank you').
                         replace(/Piss off/g, 'Thank you').
                         replace(/piss/g, 'great').
                         replace(/Piss/g, 'Great')
      }
      return node;
  });
  setTimeout(function() {
    run();
  }, 10);
}
run();