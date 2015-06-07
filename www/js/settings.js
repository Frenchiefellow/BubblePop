function onDeviceReady(){
	if( window.localStorage.getItem('combo') === null){
		window.localStorage.setItem("combo", 3);
		window.localStorage.setItem("boardSize", 8);
		window.localStorage.setItem("score", 0);
	}
}

function checkScore( score ){
	var prev = window.localStorage.getItem('score');
	var html;

	if(score > prev){
		html = "<strong>Score: " + score + " (HIGH SCORE!)</strong><br>Play Again?";
		window.localStorage.setItem("score", score);
	}
	else{
		html = html = "<strong>Score: " + score + "</strong><br>Play Again?";
	}
	return html;
}

function displayScore(){
	$('#hs').css("display", "visible");
	$('#score').html( window.localStorage.getItem("score"));

	$("#score").css("font-size", "2.0em");
	$('#hs').dialog({
			resizable: false,
			modal: true,
			title: "High Score",
			height: 150,
			buttons : {
				"Reset Score" : function(){
					window.localStorage.setItem("score", 0);
					displayScore();
				}
			}
		});
}

function displayHS(){
		$("#hsT").html( window.localStorage.getItem('score'));
}


