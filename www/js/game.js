
function Game( type, combo ){
	this.type = type;
	this.combo = combo;
}

Game.prototype.comboSize = function(){
	return this.combo;
}

Game.prototype.gameType = function(){
	return this.type;
}

/**************************************************************************************************/
function initializeGame() {
	var grid = loadGame();
	displayHS();
     
	return grid;
}

function loadGame(){
	var instance = new Game( "normal", 3 );
	var board = new Board( 8, 8 );
	var grid = board.createBoard();
	//console.log( board.getGrid() );
	var check = checkGrid( grid, board.width, board.height);
	if( check === true ){
		board.renderBoard();
		return grid;
	}
	else
		window.location.reload();
	
}

function checkGrid( grid, height, width ){
	var combo = false;
		for( var i = 0; i < height; i++ ){
			for( var j = 0; j < width; j++){
				var pairings = checkBubbles( i, j, grid, true);
				if( pairings !== undefined && Object.keys(pairings).length > 2){
					//console.log( "valid game");
					combo = true;
					break;
					break;
				}
			}
		

	}
	return combo;
}
function checkBubbles( x, y, grid, gameCheck ){
	var index = grid[x][y];
	var color = index.getColor();
	var indices = findAdjacents(grid, x, y, 7, 7);
	//console.log(indices);
	var total = checkPairings( grid, indices, color, 0 );
	var pairings = {};
	if( total.Count !== 0 ){
		//console.log( total );
		pairings['initial'] = { "X" : x, "Y" : y};
		/*$.each( total, function(){
			if( $(this)[0].value === true ){
				var index = Object.keys( pairings ).length - 1;
				var data = { "X" : $(this)[0].X, "Y" : $(this)[0].Y };
				pairings['\'' + index + '\''] = (data);	
			} 
		});
		/*console.log( "pairings initial" )
		console.log( Object.keys(pairings).length ) ;*/
		var indices = Array();
		if( total.Above.value === true && (indices.indexOf(total.Above.X + "_" + total.Above.Y) === -1 )){
			indices.push(total.Above.X + "_" + total.Above.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : total.Above.X, "Y" : total.Above.Y };
			pairings['\'' + key + '\''] = data;
		}
		if( total.Below.value === true && (indices.indexOf(total.Below.X + "_" + total.Below.Y) === -1 )){
			indices.push(total.Below.X + "_" + total.Below.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : total.Below.X, "Y" : total.Below.Y };
			pairings['\'' + key + '\''] = data;
		}
		if( total.Right.value === true && (indices.indexOf(total.Right.X + "_" + total.Right.Y) === -1 )){
			indices.push(total.Right.X + "_" + total.Right.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : total.Right.X, "Y" : total.Right.Y };
			pairings['\'' + key + '\''] = data;
		}
		if( total.Left.value === true && (indices.indexOf(total.Left.X + "_" + total.Left.Y) === -1 )){
			indices.push(total.Left.X + "_" + total.Left.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : total.Left.X, "Y" : total.Left.Y };
			pairings['\'' + key + '\''] = data;
		}
		
		if((indices.indexOf($(this)[0].X + "_" + $(this)[0].Y) === -1 ) )
			indices.push($(this)[0].X + "_" + $(this)[0].Y);

		var count = 0;
		if( gameCheck === false){
			for( var i = 0; i < Object.keys(pairings).length-1; i++) {
				pairings = recursion( pairings, grid, color, total, i, indices);
			};
		}
		

		if( Object.keys(pairings).length > 3 && gameCheck === false)
			replacePairings( pairings, grid, color);
		else
			return pairings;
	}

}
function recursion(pairings, grid, color, total, count, indices){
		var initial = Object.keys( pairings ).length;
		//console.log("Count:" + count);
		//console.log( "pairings from recursion: " + initial + " - Count: " + count);
		var position = 	pairings['\'' + count + '\''];
		//console.log( position );
		var indexes = findAdjacents( grid, position.X, position.Y, 7, 7 );
		//console.log( indexes )
		var newTotal = checkPairings( grid, indexes, color, total.Count);
	
	
		//console.log( "newTotal for: " + position.X + "|" + position.Y );
		//console.log( newTotal );
		if( newTotal.Above.value === true && (indices.indexOf(newTotal.Above.X + "_" + newTotal.Above.Y) === -1 )){
			indices.push(newTotal.Above.X + "_" + newTotal.Above.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : newTotal.Above.X, "Y" : newTotal.Above.Y };
			pairings['\'' + key + '\''] = data;
		}
		if( newTotal.Below.value === true && (indices.indexOf(newTotal.Below.X + "_" + newTotal.Below.Y) === -1 )){
			indices.push(newTotal.Below.X + "_" + newTotal.Below.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : newTotal.Below.X, "Y" : newTotal.Below.Y };
			pairings['\'' + key + '\''] = data;
		}
		if( newTotal.Right.value === true && (indices.indexOf(newTotal.Right.X + "_" + newTotal.Right.Y) === -1 )){
			indices.push(newTotal.Right.X + "_" + newTotal.Right.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : newTotal.Right.X, "Y" : newTotal.Right.Y };
			pairings['\'' + key + '\''] = data;
		}
		if( newTotal.Left.value === true && (indices.indexOf(newTotal.Left.X + "_" + newTotal.Left.Y) === -1 )){
			indices.push(newTotal.Left.X + "_" + newTotal.Left.Y);
			var key = Object.keys(pairings).length - 1;
			var data = { "X" : newTotal.Left.X, "Y" : newTotal.Left.Y };
			pairings['\'' + key + '\''] = data;
		}
		
		if((indices.indexOf($(this)[0].X + "_" + $(this)[0].Y) === -1 ) )
			indices.push($(this)[0].X + "_" + $(this)[0].Y);

		
		
		return pairings;
}

function replacePairings( pairings, grid, color ){
	var comboSize = Object.keys(pairings).length-1;
	//console.log( pairings );
	
	
	$.each( pairings, function(){
		var y = $(this)[0].Y;
		var x = $(this)[0].X;
		for( var i = x; i >= 0; i--){
			var val = false;
			try{
				if( grid[ i - 1][y] !== undefined)
					val = true;
			}catch(e){}
			
			if( val === true && grid[i-1][y].color === color){
				for( var j = 2;  (i - j) >= 0; j++ ){
					if(grid[ i - j][y].color  !== color ){
						grid[i][y] = grid[ i - j][y];
						break;
					}
				}
			}
			else if( val === true && grid[i-1][y]!== color){
				grid[i][y] = grid[ i - 1][y];
			}
			else
				grid[i][y] = new Bubble();
		
		}

	});

	//alert( "Combo of: " + comboSize );
	assignColors( grid, 8);
	adjustScore(comboSize);
	var cont = checkGrid( grid, 8, 8);
	if( cont === false){
		alert("No combos remain! \n Total Score: " + $("#total").text());
		window.location.reload();
	}
		
}

function adjustScore(size){
	var stotal = $('#total');

	stotal.html( Number(stotal.text()) +  Number(size));
		
}

function findAdjacents(grid, x, y, w, h){
	if( x === 0 && y === 0)
		return indices = { "Above" : null, "Below" : grid[x+1][y], "Right" : grid[x][y+1], "Left" : null, "X" : x, "Y" : y};
	else if( x === w && y === h)
		return indices = { "Above" : grid[x-1][y], "Below" : null, "Right" : null, "Left" : grid[x][y-1], "X" : x, "Y" : y};
	else if( x === 0 && ( y !== 0 && y !== h) )
		return indices = { "Above" : null, "Below" : grid[x+1][y], "Right" : grid[x][y+1], "Left" : grid[x][y-1], "X" : x, "Y" : y};
	else if( y === 0 && ( x !== 0 && x !== w) )
		return indices = { "Above" : grid[x-1][y], "Below" : grid[x+1][y], "Right" : grid[x][y+1], "Left" : null, "X" : x, "Y" : y};
	else if( x === w && ( y !== 0 && y !== h) )
		return indices = { "Above" : grid[x-1][y], "Below" : null, "Right" : grid[x][y+1], "Left" : grid[x][y-1], "X" : x, "Y" : y};
	else if( y === h && ( x !== 0 && x !== w) )
		return indices = { "Above" : grid[x-1][y], "Below" : grid[x+1][y], "Right" : null, "Left" : grid[x][y-1], "X" : x, "Y" : y};
	else if( x === w && y === 0 )
		return indices = { "Above" : grid[x-1][y], "Below" : null, "Right" :  grid[x][y+1], "Left" : null, "X" : x, "Y" : y};
	else if( y === h && x === 0 )
		return indices = { "Above" : null, "Below" : grid[x+1][y], "Right" :  null, "Left" : grid[x][y-1], "X" : x, "Y" : y};
	else 
		return indices = { "Above" : grid[x-1][y], "Below" : grid[x+1][y], "Right" : grid[x][y+1], "Left" : grid[x][y-1], "X" : x, "Y" : y};

}

function checkPairings( grid, indices, color, totalCount ){
	var count = 0;
	/*console.log( "indices")
	console.log( indices );*/
	var results = { "Above" : { "value" : false,  "X" : null, "Y" : null}, "Below" : { "value" : false,  "X" : null, "Y" : null}, "Left" : { "value" : false,  "X" : null, "Y": null}, "Right" : { "value" : false,  "X" : null, "Y" : null}, "Count" : 0}
	if( indices.Above !== null && indices.Above.color === color ){
		count++;
		results.Above.value = true;
		results.Above.X = (indices.X - 1);
		results.Above.Y = indices.Y;
	}

	if( indices.Below !== null && indices.Below.color === color ){
		count++;
		results.Below.value = true;
		results.Below.X = (indices.X + 1);
		results.Below.Y = indices.Y;
	}
	

	if( indices.Right !== null && indices.Right.color === color ){
		count++;
		results.Right.value = true;
		results.Right.X = (indices.X);
		results.Right.Y = (indices.Y + 1);
	}

	if( indices.Left !== null && indices.Left.color === color ){
		count++;
		results.Left.value = true;
		results.Left.X = (indices.X);
		results.Left.Y = (indices.Y - 1);
	}
	
	//console.log( count + " count from checkPairings");

	if( count > 0 ){
		totalCount += count;
		results.Count = totalCount;

	}

	return results;
}




