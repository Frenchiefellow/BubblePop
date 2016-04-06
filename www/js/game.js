


function Game( type, combo, mode ){
	this.type = type;
	this.combo = combo;
	this.mode = mode;
}

Game.prototype.comboSize = function(){
	return this.combo;
}

Game.prototype.gameType = function(){
	return this.type;
}

Game.prototype.mode = function(){
	return this.mode;
}
/**************************************************************************************************/
function initializeGame() {
	var grid = loadGame();
	displayHS();
     
	return grid;
}

function loadGame(){
	var instance = new Game( "normal", window.localStorage.getItem('combo'), window.localStorage.getItem( 'mode' ) );
	var board = new Board( window.localStorage.getItem('boardSize'), window.localStorage.getItem('boardSize') );
	var grid = board.createBoard( instance.mode );
	//console.log( board.getGrid() );
	var check = checkGrid( grid, board.width, board.height);
	if( check === true ){
		board.renderBoard();
		return grid;
	}
	else
		endGame(0, true, "No Combos Remain --");
	
}

function checkGrid( grid, height, width ){
	var combo = false;
		for( var i = 0; i < height; i++ ){
			for( var j = 0; j < width; j++){
				var pairings = checkBubbles( i, j, grid, true);
				if( pairings !== undefined && Object.keys(pairings).length > (window.localStorage.getItem('combo') - 1) ){
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
	var indices = findAdjacents(grid, x, y, window.localStorage.getItem('boardSize') - 1,  window.localStorage.getItem('boardSize') - 1);
	var total = checkPairings( grid, indices, color, 0 );
	var pairings = {};
	if( total.Count !== 0 ){
		
		pairings['initial'] = { "X" : x, "Y" : y};
	
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
		

		if( Object.keys(pairings).length > window.localStorage.getItem('combo') && gameCheck === false)
			replacePairings( pairings, grid, color);
		else
			return pairings;
	}

}
function recursion(pairings, grid, color, total, count, indices){
		var initial = Object.keys( pairings ).length;
	
		var position = 	pairings['\'' + count + '\''];
		
		var indexes = findAdjacents( grid, position.X, position.Y, window.localStorage.getItem('boardSize') - 1 , window.localStorage.getItem('boardSize') - 1);
	
		var newTotal = checkPairings( grid, indexes, color, total.Count);
	
	
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

	var count = 0;
	$.each( pairings, function(){
		//console.log( $(this));
		var y = $(this)[0].Y;
		var x = $(this)[0].X;
		if( grid[x][y].color === color){
			grid[x][y] = new testBubble();
			//console.log( 'initial black')
		}
		blackSwap( grid );
	});

	blackSwap( grid );
	
		
	assignColors( grid, window.localStorage.getItem('boardSize'));
	var score = adjustScore( comboSize, color );
	var cont = checkGrid( grid, window.localStorage.getItem('boardSize'), window.localStorage.getItem('boardSize'));
	if( cont === false){
		endGame(score, true, "No Combos Remain --");
	}
	else{
		blackSwap( grid );
	}

}

// Checks the grid for any black blocks and returns its position
function scanGrid( grid ){
	var size = $('.row').length 
	for( var i = 0; i < size; i++){
		for( var j = 0; j < size; j++){
			if( grid[i][j].color === 'black'){
				return [i,j];
				break;
			}
		}
	}
	return false;
}

//Checks above block in grid and determine whether its needs to be "repainted"
function checkAbove( grid, v, z ){
	if( (v - 1) < 0)
		return null;
	else if( grid[v - 1][z].color === 'black')
		return true;
	else
		return false;
}

function blackSwap( grid ){
	var blacks = scanGrid( grid );
		while( blacks !== false){
			//console.log( blacks[0] + " " + blacks[1])
			var paint = checkAbove( grid, Number( blacks[0] ) , Number( blacks[1] ) );
			if( paint === false ){
				repaint( grid, blacks[0], blacks[1] );
				blacks = scanGrid( grid  );
			}
			else if( paint === null ){
				grid[ blacks[0] ][ blacks[1] ] = new Bubble( window.localStorage.getItem( 'mode' ) );
				blacks = scanGrid( grid );
			}
			else{
				blacks = scanGrid( grid );
			}
		}

}
//Swaps position of "popped" block with block above
function repaint( grid, x1, y1){
	grid[x1][y1] = grid[x1-1][y1];
	$('.row:eq(' + x1 + ') .slot:eq(' + y1 + ')').slideDown('slow');
	grid[x1-1][y1] = new testBubble();
}

function adjustScore(size, color ){
	var stotal = $('#total');
	var index = new indexBubble( color );
	index = index.mult;

	if( window.localStorage.getItem('mode') === '2')
		stotal.html( Number(stotal.text()) +  ( Number(size) * index ) );
	else
		stotal.html( Number(stotal.text()) +  Number(size) );
	comboUpdate( new indexBubble( color ) , size );

	return Number( stotal.text() );
		
}

// Returns all adjacent blocks to initial block
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
	
	

	if( count > 0 ){
		totalCount += count;
		results.Count = totalCount;

	}

	return results;
}




