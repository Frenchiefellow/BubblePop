function retrieveDB(){
	var db = openDatabase('Datas', '1.0', "Settings info", 2 * 1024 * 1024);
	db.transaction(function( x ){
		x.executeSql("CREATE TABLE IF NOT EXISTS Setting (user unique, combo, boardSize, score)");
	});
	return db;
}

function checkScore( score ){
	var html;
	var db = retrieveDB();
	var previous;
	var html;
	db.transaction(function( x ){
		x.executeSql("INSERT OR IGNORE INTO Setting (user, combo, boardSize, score) VALUES (1, 3, 8, 0)");
		x.executeSql("SELECT score FROM Setting WHERE user=1", [], function(tx, result){
			previous = result.rows[0].score;

			if( score > previous ){
				x.executeSql("UPDATE Setting SET score=? WHERE user=1", [score]);
				html = "<Mstrong>Score: " + score + " (High Score!)</strong><br><br>Do you start another?";
				$('#dText').html(html);
			}else{
				html = "<Mstrong>Score: " + score + "</strong><br><br>Do you start another?";
				$('#dText').html(html);
			}
		});
	});


	return html;
}

function displayScore(){
	$('#hs').css("display", "visible");
	var xml = retrieveXML();
	var previous = xml.getElementsByTagName("score")[0].innerHTML;
	$('#score').html("<strong>" + previous + "</strong>");
	$("#score").css("font-size", "2.0em");
	$('#hs').dialog({
			resizable: false,
			modal: true,
			title: "High Score",
			height: 150,
			buttons : {
				"Reset Score" : function(){
					xml.getElementsByTagName("score")[0].innerHTML = 0;
					displayScore();
				}
			}
		});
}

