
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
	var rootNode = null;

	for (var i = 0; i < towers.length; i++) {
		var tower = towers[i];
		if (tower == '')
			continue;
		var holding = null;

		if (tower.indexOf('-> ') > -1)
			var holding = tower.substr(tower.indexOf('-> ')+3).split(', ');

		stack[tower.substr(0,tower.indexOf(' '))] = {
			'weight' : parseInt(tower.match(/\((\d*)\)/)[1]),
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
		if (!stack[key].heldBy){
			console.log ('Found root: ' + key);
			rootNode = key;
		}

	}	


	var imbalanced = {};

	checkBalance(rootNode);
	
//	console.log('imbalanced', imbalanced);

	var values = imbalanced.children.map(function(el){
		return el.weight;
	});

//	console.log('values', values);

	values = values.sort();

	// if the first two values are the same, then the odd one is further
	// right and both of the first two are correct. if they're different
	// then the first one is the unique value and the second one is correct
	// either way, the second one is correct 
	var targetValue = values[1];

//	console.log('targetValue: ', targetValue);

	var delta = imbalanced.children.reduce(function(prevVal,el){
		if (el.weight != targetValue){
			imbalanced.problemChild = el.name;
			return (prevVal + ((el.weight - targetValue) * -1));
		} else {
			return prevVal;
		}
	},0);

//	console.log('delta', delta);

	var message =  ('change weight of: ' + imbalanced.problemChild + ' to ' + (stack[imbalanced.problemChild].weight + delta));
	return message;

	function checkBalance(nodeName){
		// get the node's children's weights, check them for balance, add the node's weight, and return the sum
		var node = stack[nodeName];
		var weight = node.weight;
		var children = null;

		if (node.holding){
			children = node.holding.map(function(el){
				return ({
					name: el,
					weight: checkBalance(el)
				});
			});

			var childWeight = children.reduce(function(prevVal,el){
				if (((prevVal > 0) && (el.weight != prevVal)) && !imbalanced.name){
					console.log('imbalanced: ', nodeName);
					console.log('weights: ', children);
					imbalanced.children = children;
					imbalanced.name = nodeName;
					imbalanced.weight = node.weight;
				}

				weight += el.weight;
				return el.weight;
			},0);
		
		}		
		return weight;
	}

}