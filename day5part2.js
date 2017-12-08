
fs = require('fs')

fs.readFile('./day5part1_input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(processInput(data));
});


function processInput(input){

	var stones = input.split(/\n/); 

	//empty item at the end due to last carriage return
	stones.pop();

//	console.log('stones: ', stones);

	var idx = 0;
	var willEscape = false;
	var moves = 0;

	while (!willEscape){
//		console.log('going to index: ', idx);
		var steps = parseInt(stones[idx]);
//		console.log('steps to move: ', steps);
		
		if (steps >= 3)
			stones[idx]--;
		else
			stones[idx]++;

		if ((idx+steps > (stones.length-1)) || (idx+steps < 0)){
			willEscape = true;
		} else {
			idx += steps;
		}

		moves++;
	}

	return 'got out in XXX moves'.replace('XXX', moves);
}