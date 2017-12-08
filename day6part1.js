var input = '2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14';
var banks = input.split(/\t/);
// convert to integers
banks = banks.map(function (el){
	return parseInt(el);
});


var redistributions = 0;
var seen = [banks.slice().join('')];

var repeatFound = false;

while (!repeatFound){
	//figure out the highest number among the banks
	var highest = banks.reduce(function(curHighest, elem) {
	    return elem > curHighest ? elem : curHighest;
	}, 0);	

	//find the first bank with the highest number
	var targetBank = banks.indexOf(highest);

	//zero it out
	banks[targetBank] = 0;

	//redistribute
	for (var i = 0;i<highest;i++){
		banks[(targetBank + 1 + i) % banks.length]++;
	}

	//compare against previous patterns
	if (seen.indexOf(banks.join('')) > -1)
		repeatFound = true;

	//add the current pattern to previously seen
	seen.push(banks.join(''));

	redistributions++;
}

console.log('redistributions: ', redistributions);