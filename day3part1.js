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
var grid=[[0,0]];
var direction = 'r';
var spaceIncrement = 0;
var target = 325489; 

while (grid.length < 1000000) {
	for (var i=0;i<fillSpaces;i++) {
		grid.push(curPos.slice());
		moveCursor();
	}

	if (spaceIncrement++ % 2 == 0)
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
}

console.log('steps: ', parseInt( Math.abs(grid[target][0]) + Math.abs(grid[target][1]) ));


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
