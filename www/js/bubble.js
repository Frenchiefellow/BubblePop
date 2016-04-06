var colors = ["orange", "green", "red", "blue", "white", "yellow", "pink", "purple"];
var hardProb = [ 18, 48, 88, 136, 148, 178, 198, 200 ];
var easyProb = [ 25, 50, 75, 100, 125, 150, 175, 200 ];  
var multiplier = [ 3, 1, 1, 2, 7, 6, 8, 100 ]

function Bubble( mode ){
	this.color = colors[ getRandom( modeSwap( mode ) ) ];
	this.mult = multiplier[ getRandom( modeSwap( mode ) ) ];
}

function indexBubble( color ){
	this.color = color;
	this.mult = multiplier[ colors.indexOf( color ) ];
}

function testBubble(  ){
	this.color = 'black';
}

testBubble.prototype.getColor = function(){
	return this.color.toString();
}

Bubble.prototype.getColor = function(){
	return this.color.toString();
}

Bubble.prototype.getMult = function(){
	return this.mult;
}

function getRandom( probability ){
	var base = Math.floor( ( Math.random() * 200 ) ) + 1;
	var prob = 200 - base;
	var returnVal;

	for( var i = 1; i <= probability.length; i++ ){
		if( prob <= probability [ i - 1 ] ){
			returnVal = i  - 1;
			break;
		}

		else if( prob > probability[ i - 1 ] && prob <= probability[ i ] ){
			returnVal = i;
			break;
		}
		else{}
	}

	return returnVal;
}

function modeSwap( mode ){
	switch( mode ){
		case '1' :
						return easyProb;
						break;
		case '2'	:
						return hardProb;
						break;
	}
}

/***********************************************************************************************/
