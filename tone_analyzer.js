var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: "2a460659-2311-4613-8f63-467520c31e24",
  password: "gLzfrrMv5a4q",
  version: 'v3',
  version_date: '2016-05-19'
});

tone_analyzer.tone({ text: 'You\'re like spongebob, a fucking square' },
  function(err, tone) {
    var obj, i;
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
      obj = JSON.parse(JSON.stringify(tone));
      var tones = obj.document_tone.tone_categories[0].tones;
      for (i = 0; i < tones.length; i++){
        //console.log(tones[i].tone_name);
        if (tones[i].tone_name == 'Anger' || tones[i].tone_name == 'Disgust'){
          console.log(tones[i].tone_name + ' ' + tones[i].score);
        }
      }
      //console.log(tones);
});
