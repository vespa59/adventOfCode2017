// generate the grid

/*
r 1 
u 1
l 2
d 2
r 3
u 3
l 4
d 4


17  16  15  14  13	30
18   5   4   3  12	29
19   6   1   2  11	28
20   7   8   9  10	27
21  22  23	24	25	26

*/


var curPos = [0,0];
var fillSpaces = 0;
var grid={'0~-1':1};
var direction = 'r';
var spaceIncrement = 0;
var target = 325489; 
var counter = 0;

while (counter < 10000) {
	for (var i=1;i<fillSpaces;i++) {
		//console.log('writing ' + calculateNeighbors() + ' to ' + curPos[0].toString() + ',' + curPos[1].toString());

		var calculatedNeighbors = calculateNeighbors();

		if (calculatedNeighbors > target){
			console.log('found: ', calculatedNeighbors);
			process.exit();
		}
		else
			grid[curPos[0].toString() + '~' + curPos[1].toString()] = calculateNeighbors();

		moveCursor();
	}

	if (spaceIncrement++ %2 == 0)
		fillSpaces++;

	switch (direction){
		case 'r': 
			direction = 'u';
			break;
		case 'u': 
			direction = 'l';
			break;
		case 'l': 
			direction = 'd';
			break;
		case 'd': 
			direction = 'r';
			break;
	}

	counter++;
}

function calculateNeighbors(){
	var total = 0;
	var x = curPos[0];
	var y = curPos[1];

	var e = (x+1).toString();
	var n = (y+1).toString();
	var w = (x-1).toString();
	var s = (y-1).toString();

	x = x.toString();
	y = y.toString();

	//east
	if (grid[e + '~' + y])
		total += grid[e + '~' + y];

	//east - north
	if (grid[e + '~' + n])
		total += grid[e + '~' + n];

	//north
	if (grid[x + '~' + n])
		total += grid[x + '~' + n];

	//west - north
	if (grid[w + '~' + n])
		total += grid[w + '~' + n];

	//west
	if (grid[w + '~' + y])
		total += grid[w + '~' + y];

	//west - south
	if (grid[w + '~' + s])
		total += grid[w + '~' + s];

	//south
	if (grid[x + '~' + s])
		total += grid[x + '~' + s];

	//east - south
	if (grid[e + '~' + s])
		total += grid[e + '~' + s];

	return total;
}

//console.log('steps: ', parseInt( Math.abs(grid[target][0]) + Math.abs(grid[target][1]) ));

/*
for (var i=0;i<grid.length;i++){
	console.log(i.toString() + ': ' + grid[i][0].toString() + ',' + grid[i][1].toString());
}
*/


function moveCursor(){
	switch (direction){
		case 'r' :
			curPos = [curPos[0] + 1, curPos[1]]; 
			break;
		case 'l' :
			curPos = [curPos[0] - 1, curPos[1]]; 
			break;
		case 'u' :
			curPos = [curPos[0], curPos[1] + 1]; 
			break;
		case 'd' :
			curPos = [curPos[0], curPos[1] -1]; 
			break;
	}
}
