/*var input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`
*/


fs = require('fs')

fs.readFile('./day8part1_input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(processInput(data));
});

function processInput(input){
	var instructions = input.split(/\n/);
	//filter out empties
	instructions = instructions.filter(function(el){
		return (el != '');
	});

	var registers = {};
	var highestEver = -9999999;

	for (var i = 0; i < instructions.length; i++) {
		instruction = instructions[i];
		parts = instruction.split(' ');
		instruction = {
			'target' : parts[0],
			'effect' : parts[1],
			'by' : parseInt(parts[2]),
			'left' : parts[4],
			'operator' : parts[5],
			'right' : parseInt(parts[6])
		};

		if (!registers[instruction.target])
			registers[instruction.target] = 0;

		if (!registers[instruction.left])
			registers[instruction.left] = 0;

		if (checkEquation()){
			registers[instruction.target] = instruction.effect == 'inc' ? 
			registers[instruction.target] + instruction.by : 
			registers[instruction.target] - instruction.by;

			highestEver = registers[instruction.target] > highestEver ? registers[instruction.target] : highestEver;
		}

		function checkEquation(){
			switch (instruction.operator){
				case '>' :
					if (registers[instruction.left] > instruction.right)
						return true;
					break;
				case '<' :
					if (registers[instruction.left] < instruction.right)
						return true;
					break;
				case '>=' :
					if (registers[instruction.left] >= instruction.right)
						return true;
					break;
				case '<=' :
					if (registers[instruction.left] <= instruction.right)
						return true;
					break;
				case '==' :
					if (registers[instruction.left] == instruction.right)
						return true;
					break;
				case '!=' :
					if (registers[instruction.left] != instruction.right)
						return true;
					break;
			}
			return false;
		}
	}

	var values = [];
	for (var register in registers){
		values.push(registers[register]);
	}
	values = values.sort(function(a, b){return a-b});

	console.log('highest ever: ', highestEver);

	return values;
}
