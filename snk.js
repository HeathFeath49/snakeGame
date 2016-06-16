//javascript for snake game

$('document').ready(function(){

	//canvas information
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var canWidth = $('#canvas').width();
	var canHeight = $('#canvas').height();


	function initiateGame(){

		//game loop 
		if(typeof game_loop != 'undefined'){ //if game_loop has not been initiated....
			clearInterval(game_loop);
			setInterval(draw,60);
		}

	}

	//create snake using array
	function createSnake(){

	}


	//draw snake to screen using the snake array
	function draw(){

	}




});