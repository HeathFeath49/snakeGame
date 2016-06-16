//javascript for snake game

$('document').ready(function(){

	//canvas information
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var canWidth = $('#canvas').width();
	var canHeight = $('#canvas').height();
	var cellSize = 20;
	var snakeArr = [];

	function initiateGame(){
		createSnake();

		if(typeof game_loop != "undefined"){
			clearInterval(game_loop);
		}
		game_loop = setInterval(draw, 60);

	}

	initiateGame();


	//create snake using array
	function createSnake(){
		var snakeLength = 5;
		for(var p=snakeLength-1;p>=0;p--){
			snakeArr.push({xVal:p,yVal:0});
		}
	}

	//draws snake and the background to screen
	function draw(){
		//background
		ctx.fillStyle ='pink';
		ctx.fillRect(0,0,canWidth,canHeight);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0,0,canWidth,canHeight);

		//snake
		for(var b=snakeArr.length-1;b>=0;b--){
			var currentCell = snakeArr[b];
			drawCell(currentCell.xVal,currentCell.yVal); 
		}

	}
	//function to draw individual cells
	function drawCell(x,y){
		ctx.fillStyle = 'green';
		ctx.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
		ctx.strokeStyle = 'white';
		ctx.strokeRect(x*cellSize,y*cellSize,cellSize,cellSize);
	}

});