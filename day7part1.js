
fs = require('fs')

fs.readFile('./day7part1_input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(processInput(data));
});

function processInput(input){
	//build the stack
	var towers = input.split(/\n/);
	var stack = {};

	for (var i = 0; i < towers.length; i++) {
		var tower = towers[i];
		if (tower == '')
			continue;
		var holding = null;

		if (tower.indexOf('-> ') > -1)
			var holding = tower.substr(tower.indexOf('-> ')+3).split(', ');

		stack[tower.substr(0,tower.indexOf(' '))] = {
			'weight' : tower.match(/\((\d*)\)/)[1],
			'holding' : holding
		};
	}

	// add a key for who is holding each tower up
	for (key in stack){
		var tower = stack[key];
		if (tower.holding){
			for (var i = 0; i < tower.holding.length; i++) {
				var heldTower = tower.holding[i];
				stack[heldTower].heldBy = key;
			}
		}
	}

	// find the one that isn't held
	for (key in stack){
		if (!stack[key].heldBy)
			return ('Found root: ' + key);
	}	
}
