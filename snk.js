//javascript for snake game

$('document').ready(function(){

	//canvas variables
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var canWidth = $('#canvas').width();
	var canHeight = $('#canvas').height();
	//game variables
	var cellSize = 20;
	var snakeArr = [];
	var direction = "right";

	function initiateGame(){
		createSnake();

		if(typeof game_loop != "undefined"){
			clearInterval(game_loop);
		}
		game_loop = setInterval(draw, 150);

	}

	initiateGame();


	//create snake using array
	function createSnake(){
		var snakeLength = 5;
		for(var p=snakeLength-1;p>=0;p--){
			snakeArr.push({xVal:p,yVal:0});
		}
		/*console.log(snakeArr.length);*/
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
		checkInput();
		moveSnake();

	}
	//function to draw individual cells
	function drawCell(x,y){
		ctx.fillStyle = 'green';
		ctx.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
		ctx.strokeStyle = 'white';
		ctx.strokeRect(x*cellSize,y*cellSize,cellSize,cellSize);
	}

	//function to check player input
	function checkInput(){
		$(document).on('keypress',function(keyNum){
			switch(keyNum.which){
				case 119:
					direction = 'up';
					break;
				case 97:
					direction = 'left';
					break;
				case 115:
					direction = 'down';
					break;
				case 100:
					direction = 'right';
					break;

			}
		})
	}

	//function to move snake
	function moveSnake(){
		var sTx = snakeArr[0].xVal;
		var sTy = snakeArr[0].yVal;
		var tail;

		//check user input
		if(direction == "right"){
			sTx++;
		}
		else if(direction == "left"){
			sTx--;
		}
		else if(direction == "up"){
			sTy--;
		}
		else if(direction == "down"){
			sTy++;
		}

		tail = snakeArr.pop();
		tail.xVal = sTx; tail.yVal = sTy;
		snakeArr.unshift(tail);
	}

});