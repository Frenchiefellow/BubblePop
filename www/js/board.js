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

	   var width = (window.innerWidth > 0) ? window.innerWidth: screen.width;
       var height = (window.innerHeight > 0) ? window.innerHeight: screen.height;
       $('#boardSpace').width( width );
       $('#boardSpace').height( Math.ceil(height - (height * .10)));
       $('.row').css({"width" : width });
       $('.row').css( "height", Math.floor(($('#boardSpace').height() / this.height)));
       $('.slot').css( "width", (width / this.width) - 2);
       $('.slot').css( "height", $('.row').height() - 2);
       $('#scoreBoard').height( Math.ceil( height * .10));
       $('body').css({"max-width" : width, "max-height" : height, "width" : width, "height" : height});

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

function endGame( score, end){
	$("#endGame").css("display", "visible");
	if( end === true ){
		var html = checkScore( score );
		$('#dText').html(html)
		$('#endGame').dialog({
			resizable: false,
			modal: true,
			title: "Game Over!",
			height: 170,
			buttons: {
				"Yes" : function(){
					$(this).dialog('close');
					window.location.reload();
				},
				"No" : function(){
					$(this).dialog('close');
					window.location.href = '../index.html';
				}
			}
		});
	}
	else{
		$('#dText').text("What would you like to do?");
		$('#dText').css( "color", "black");
		$('#endGame').dialog({
			resizable: false,
			modal: true,
			title: "Quit?",
			height: 130,
			buttons: {
				"New Game" : function(){
					$(this).dialog('close');
					endGame( score, true );
				},
				"Quit" : function(){
					endGame( score, true );
					$(this).dialog('close');
					window.location.href = '../index.html';
				}
			}
		});
	}

}