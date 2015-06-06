var colors = ["orange", "green", "red", "blue", "white", "yellow"]

function Bubble(){
	this.color = colors[ Math.floor( ( Math.random() * colors.length ) ) ];
}

Bubble.prototype.getColor = function(){
	return this.color.toString();
}

/***********************************************************************************************/
