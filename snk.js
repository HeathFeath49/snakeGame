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
	var snakeLength = 5;
	var sTx;
	var sTy;
	var tail;
	var direction = "right";
	var foodExists = false;
	var fX; //holds x value of food
	var fY; //holds y value of food

	function initiateGame(){
		createSnake();

		if(typeof game_loop != "undefined"){
			clearInterval(game_loop);
		}
		game_loop = setInterval(draw, 100);

	}

	initiateGame();


	//create snake using array
	function createSnake(){
		
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
		checkCollision();
		moveSnake();
		createFood();
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
					if(!(direction == 'down')){
						direction = 'up';
					}
					break;
				case 97:
					if(!(direction == 'right')){
						direction = 'left';
					}
					break;
				case 115:
					if(!(direction == 'up')){
						direction = 'down';
					}
					break;
				case 100:
					if(!(direction == 'left')){
						direction = 'right';
					}
					break;

			}
		})
	}

	function checkCollision(){

		/*BOUNDARIES COLLISION DETECTION*/

		var sH = snakeArr[0];
		if(sH.xVal > (canWidth/cellSize)-1){//right wall collision detection
			clearInterval(game_loop);
		}
		if(sH.xVal < 0){//left wall collision detection
			clearInterval(game_loop);
		}
		if(sH.yVal < 0){//top collision detection	
			clearInterval(game_loop);
		}
		if(sH.yVal > (canHeight/cellSize)-1){//bottom collision detection
			clearInterval(game_loop);
		}

		/*COLLECTABLES COLLISION DETECTION*/

		if(sH.xVal == fX && sH.yVal == fY){
			snakeArr.push({xVal:0,yVal:0});
			foodExists = false;
		}

		/*SNAKE BODY COLLISION DETECTION*/
		for(i in snakeArr){
			if(!(i == 0)){
				sTx = snakeArr[0].xVal;
				sTy = snakeArr[0].yVal;

				if(snakeArr[i].xVal == sTx && snakeArr[i].yVal == sTy){
					clearInterval(game_loop);
				}		
			}
		}


	}

	//function to move snake
	function moveSnake(){
		sTx = snakeArr[0].xVal;
		sTy = snakeArr[0].yVal;
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

	//function that calls the paintcell function on random x and y value
	function createFood(){
		if(!(foodExists)){
			fX = Math.floor(Math.random()*(canWidth/cellSize));
			fY = Math.floor(Math.random()*(canHeight/cellSize));
		
			foodExists = true;	
		}	
		drawCell(fX,fY);
	}

});