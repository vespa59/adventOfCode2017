fs = require('fs')

fs.readFile('./day4part1_input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

/*
  data = `una bokpr ftz ryw nau yknf fguaczl anu
tvay wvco bcoblpt fwzg sfsys zvuqll mcbhwz ovcw fgdy
ynsocz vid rfmsy essqt fpbjvvq sldje qfpvjvb`;
*/

  console.log(processInput(data));
});




function processInput(data){
	var phrases = data.split(/\n/);
	console.log('total phrases: ', phrases.length);

	var valid = 0;

	for (var i = 0; i < phrases.length; i++) {
		if (phrases[i].length < 2)
			continue;

		console.log('phrase: ', phrases[i]);
		var words = phrases[i].split(/\s/);

		//break each word in to an array of chars and sort, then join them back up
		words = words.map(function(elem){
			return elem.split('').sort().join('');
		});

		console.log('words: ', words);

		//loop the array and look for dupes
		var invalid = words.reduce(function(prevVal, elem, idx) {
			console.log('word', elem);
			console.log('index', idx);
			console.log('found at: ', words.indexOf(elem));

			if (words.indexOf(elem) != idx)
				return prevVal+1;
			else
				return prevVal;
		},0);

		console.log("valid: ", invalid ? 'no' : 'yes', '\n');

		if (invalid === 0)
			valid++;

	}

	return valid;

}