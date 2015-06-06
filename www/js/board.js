function Board( height, width ){
	this.height = height;
	this.width = width;
	this.grid = 0;
}

Board.prototype.getSize = function(){
	return this.height + "x" + this.width;
}

Board.prototype.getGrid = function(){
	return this.grid;
};

Board.prototype.createBoard = function(){
	var height = this.height;
	var width = this.width;
	var numBalls = height * width;
	var grid = boardArray( height, width )
	grid[0][0] = new Bubble;
	for( var i = 0; i < height; i++ ){
		for( var j = 0; j < width; j++ ){
			grid[i][j] = new Bubble();
		}
	}
	this.grid = grid;
	return grid;
}

Board.prototype.renderBoard = function( ){
	var space = $("#boardSpace");
	space.empty();

	for( var i  = 0; i < this.height; i++){
		var row = document.createElement( 'div');
		row.className = "row";
		row.style.cssText = "width: " + (32 * this.width) + "px;";
		space.append(row);	
	}
	for( var j = 0; j < this.width; j++){	
		var slot = document.createElement('span');
		slot.className = "slot";
		$('.row').append(slot);
	}	
	assignColors( this.grid, this.width );
}

/*****************************************************************************************/
function boardArray( height, width ){
	var arr = new Array( height );
	for( var i = 0; i < height; i++ )
		arr[i] = new Array( width );
	return arr;
}

function assignColors( grid, width ){
	var rows = 0;
	var columns = 0;

  	$('#boardSpace').children('div').each(function(){
  		$(this).find('span').each(function(){
  			$(this).css("background-color", grid[rows][columns].getColor());
  			if( columns < width - 1)
				columns++;
			else
				columns = 0;
  		});
  		rows++;
  	});
}
