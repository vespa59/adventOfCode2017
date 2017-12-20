var listLength = 256;
var curPos = 0;
var skipSize = 0;
var lengths = [227,169,3,166,246,201,0,47,1,255,2,254,96,3,97,144];

var list = [];

//initialize the list
for (var i = 0; i < listLength; i++) {
	list[i] = i;
}

for (var i = 0; i < lengths.length; i++) {
	var l = lengths[i];
	var values = [];

	// get all the values we need
	for (var j = 0; j < l; j++) {
		values.push(list[(curPos + j) % listLength]);	
	}

	values = reverseArray(values);

	// write the new values
	for (var j = 0; j < l; j++) {
		list[(curPos + j) % listLength] = values[j];	
	}

	//update current position and skip size
	curPos = (curPos + l + skipSize) % listLength;
	skipSize++;
}

//report result
console.log(list[0] * list[1]);


function reverseArray(inputArray){
	var newArray = [];
	for (var i = inputArray.length - 1; i >= 0; i--) {
		newArray.push(inputArray[i]);
	}
	return newArray;
}