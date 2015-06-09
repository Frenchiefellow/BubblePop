function onDeviceReady(){
	if( window.localStorage.getItem('combo') === null){
		window.localStorage.setItem("combo", 3);
		window.localStorage.setItem("boardSize", 8);
		window.localStorage.setItem("score", 0);

		$('#opts [name="comboSize"]').attr("value", window.localStorage.getItem('combo'));
		$('#opts [name="bSize"]').attr("value", window.localStorage.getItem('boardSize') );
	}
	$('#opts [name="comboSize"]').attr("value", window.localStorage.getItem('combo'));
	$('#opts [name="bSize"]').attr("value", window.localStorage.getItem('boardSize') );
	$('#opts [name="comboSize"] ,#opts [name="bSize"] ').css({ "width" : "40px"});
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

function options(){
	$('#opt').css("display", "visible");
	$('#opt span').css({ "float" : "left"});
	$('#opt input').css({ "float" : "right"});
	$('#opt').dialog({
			resizable: false,
			modal: true,
			title: "Options",
			height: 200,
			buttons : {
				"Apply" : function(){
					if( $('#opts [name="comboSize"]').val() !== "" &&  $('#opts [name="comboSize"]').val() !== ""){
						window.localStorage.setItem("combo", $('#opts [name="comboSize"]').val() );
						window.localStorage.setItem("boardSize", $('#opts [name="bSize"]').val() );
						$(this).dialog('close');
					}
					else if( $('#opts [name="comboSize"]').val() !== "" &&  $('#opts [name="comboSize"]').val() === "" ){
						window.localStorage.setItem("boardSize", $('#opts [name="bSize"]').val() );
						$(this).dialog('close');
					}
					else if ( $('#opts [name="comboSize"]').val() === "" &&  $('#opts [name="comboSize"]').val() !== "" ){
						window.localStorage.setItem("combo", $('#opts [name="comboSize"]').val() );
						$(this).dialog('close');
					}
					else{
						$(this).dialog('close');
					}
				},
				"Close" : function(){
					$(this).dialog('close');
				}
			}
		});
}

function credits(){
	$('#cred').css("display", "visible");
	$('#cred').dialog({
			resizable: false,
			modal: true,
			title: "Credits",
			height: 140,
			buttons : {
				"GitHub" : function(){
					window.location.href = 'https://www.github.com/frenchiefellow';
				},
				"Close" : function(){
					$(this).dialog('close');
				}
			}
		});
}

function correctMe()
  {
    switch(window.orientation) 
    {  
      case -90:
      case 90:
      alert( "I ROTATED");
        if( window.location.href.indexOf("game.html") > -1){
        	responsiveGame( false );
        }
        else{
        	responsive();
        }
        break; 
      default:
        if( window.location.href.indexOf("game.html") > -1){
        	responsiveGame( true );
        }
        else{
        	responsive();
        }
       
        break; 
    }
  }


function responsive(){
   	   var width = (window.innerWidth > 0) ? window.innerWidth: screen.width;
       var height = (window.innerHeight > 0) ? window.innerHeight: screen.height;
        $('h1').css({ "margin-bottom" : height * .15})
    	$('body').css({ "width" : width, "height" : height, "max-width" : width, "max-height" : height, "overflow" : "hidden" });
    	$('#hs ,#opt ,#cred').css("display", "none");
    	$('#buttons').width( width );
    	$('#buttons').height( height * .8)
    	$('.subButton').css({ "margin-bottom" : $('#buttons').height() / 6, "margin-left" : (($('#buttons').width() - 100) / 2)  })
   	}


function responsiveGame( direction ){
	if( direction === true){

	}
	else{
	}
}
