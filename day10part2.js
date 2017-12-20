var listLength = 256;
var curPos = 0;
var skipSize = 0;
var input = '227,169,3,166,246,201,0,47,1,255,2,254,96,3,97,144';

var lengths = [];

var list = [];

//initialize the list
for (var i = 0; i < listLength; i++) {
	list[i] = i;
}

//convert lengths to ASCII
for (var i = 0; i < input.length; i++) {
	lengths.push(input.charCodeAt(i));
}

//append standard length suffix values
lengths.push(17,31,73,47,23);



//generate sparse hash
for (var i = 0; i < (lengths.length*64); i++) {
	var l = lengths[i%lengths.length];
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

//generate dense hash
var blocks = [];
var c = 0;
for (var i = 0; i < list.length; i++) {
	c = c ^ list[i];

	if (((i+1)%16) == 0){
		blocks.push(c);
		c = 0;
	}
}

var hash = '';

for (var i = 0; i < blocks.length; i++) {
	var hex = parseInt(blocks[i]).toString(16);
	if (hex.length < 2)
		hex = '0' + hex;

	hash += hex;
}

console.log('hash: ', hash);


function reverseArray(inputArray){
	var newArray = [];
	for (var i = inputArray.length - 1; i >= 0; i--) {
		newArray.push(inputArray[i]);
	}
	return newArray;
}