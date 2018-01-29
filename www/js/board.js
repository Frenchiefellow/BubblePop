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

Board.prototype.createBoard = function( mode ){
	var height = this.height;
	var width = this.width;
	var numBalls = height * width;
	var grid = boardArray( height, width )
	grid[0][0] = new Bubble( mode );
	for( var i = 0; i < height; i++ ){
		for( var j = 0; j < width; j++ ){
			grid[i][j] = new Bubble( mode );
		}
	}
	this.grid = grid;
	return grid;
}

Board.prototype.renderBoard = function(  ){
	var space = $("#boardSpace");
	space.empty();

	for( var i  = 0; i < this.height; i++){
		var row = document.createElement( 'div');
		row.className = "row";
		row.style.cssText = "width: " + (32 * this.width) + "px;";
		space.append(row);	
	}
	for( var j = 0; j < this.width; j++){	
		var slot = document.createElement('div');
		slot.className = "slot";
		$('.row').append(slot);
	}	


		responsiveBoard(this.width, this.height, false);
		assignColors( this.grid, this.width );
}

/*****************************************************************************************/
function responsiveBoard(w,h, orient){
	   var width = (window.innerWidth > 0) ? window.innerWidth: screen.width;
       var height = (window.innerHeight > 0) ? window.innerHeight: screen.height;
       $('#boardSpace').width( width );
       $('#boardSpace').height( Math.ceil(height - (height * .10)));
       $('.row').css({"width" : width });
       $('.row').css( "height", Math.floor(($('#boardSpace').height() / h)));
       $('.slot').css( "width", Math.floor($('.row').width() / w) - 2);
       $('.slot').css( "height", $('.row').height() - 2);
       $('#scoreBoard').height( Math.floor( height * .10));
       $('body').css({"max-width" : width, "max-height" : height, "width" : width, "height" : height});
       $('#hs').css({ "top" :  $('#scoreBoard').height() - $('#hs').height() })
       if( orient === true){
       		$('#score').css({"font-size" : "1.0em" });
       }else{
       		$('#score').css({"font-size" : "2.5em" });
       }
}

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
  		$(this).find('div').each(function(){
  			$(this).css("background-color", grid[rows][columns].getColor());
  			if( columns < width - 1)
				columns++;
			else
				columns = 0;
  		});
  		rows++;
  	});
}

function endGame( score, end, done){
	$("#endGame").css("display", "visible");
	if( end === true ){
		var html = checkScore( score );
		$('#dText').html(html);
		$('#endGame').dialog({
			resizable: false,
			modal: true,
			title: done + "Game Over!",
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
					endGame( score, true,  score + "pts - ");
				},
				"Quit" : function(){
					$(this).dialog('close');
					endGame( score, true, score + "pts - ");
				}
			}
		});
	}
}

function comboUpdate( index , comboSize ){
	
	var pColor = $('#prevColor');
	var comboScore = $('#comboScore');
	var pCombo = $('#prevCombo');
	var color = index.color;
	var mult = index.mult;
	var bonus = determineBonus(comboSize)
	pColor.html( color + '(' + comboSize + '+' + bonus +')');
	pCombo.html( comboSize );
	comboScore.html( comboSize * Number( mult ) );

}
