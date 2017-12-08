fs = require('fs')

fs.readFile('./day4part1_input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(processInput(data));
});




function processInput(data){
	var phrases = data.split(/\n/);
	console.log('total phrases: ', phrases.length);

	var valid = 0;

	for (var i = 0; i < phrases.length; i++) {
		var phrase = phrases[i].split(/\s/);

		if (phrase.length < 2)
			continue;

		var validated = phrase.filter(function(el, j, phrase){
			return phrase.indexOf(el) === j;
		});

		if (validated.length == phrase.length){
			valid++;
			console.log('valid: ', phrase);
		}
		else
			console.log('invalid: ', phrase);
	}

	return valid;
/*
	var uniqueProducts = array.filter(function(elem, i, array) {
        	return array.indexOf(elem) === i;
    	}
	);
*/
}