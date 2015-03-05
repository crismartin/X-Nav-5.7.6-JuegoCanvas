// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// stone1 image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

// stone2 image
var stone2Ready = false;
var stone2Image = new Image();
stone2Image.onload = function () {
	stone2Ready = true;
};
stone2Image.src = "images/stone.png";

// stone3 image
var stone3Ready = false;
var stone3Image = new Image();
stone3Image.onload = function () {
	stone3Ready = true;
};
stone3Image.src = "images/stone.png";

// stone4 image
var stone4Ready = false;
var stone4Image = new Image();
stone4Image.onload = function () {
	stone4Ready = true;
};
stone4Image.src = "images/stone.png";

// stone5 image
var stone5Ready = false;
var stone5Image = new Image();
stone5Image.onload = function () {
	stone5Ready = true;
};
stone5Image.src = "images/stone.png";



// ** Mounstros **//
// mounstro1 image
var mounstro1Ready = false;
var mounstro1Image = new Image();
mounstro1Image.onload = function () {
	mounstro1Ready = true;
};
mounstro1Image.src = "images/monster.png";

// mounstro2 image
var mounstro2Ready = false;
var mounstro2Image = new Image();
mounstro2Image.onload = function () {
	mounstro2Ready = true;
};
mounstro2Image.src = "images/monster.png";

// mounstro2 image
var mounstro3Ready = false;
var mounstro3Image = new Image();
mounstro3Image.onload = function () {
	mounstro3Ready = true;
};
mounstro3Image.src = "images/monster.png";


// ** Posiciones ** //
// posiciones de las piedras
var pos_stone1 = {x:250,y:128,w:32,h:32};
var pos_stone2 = {x:150,y:230,w:32,h:32};
var pos_stone3 = {x:360,y:316,w:32,h:32};
var pos_stone4 = {x:216,y:360,w:32,h:32};
var pos_stone5 = {x:356,y:190,w:32,h:32};

var pos_init_m1 = {x:410, y:120, w:32, h:32};
var pos_init_m2 = {x:50, y:180, w:32, h:32};
var pos_init_m3 = {x:canvas.width/2, y:400, w:32, h:32};

var obstaculos = [pos_stone1,pos_stone2,pos_stone3,pos_stone4, pos_stone5];
var monsters = [monster, monster2, monster3];

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
var princessesCaught = 0;
var nivel = 1;

var monster = {	
	x:pos_init_m1.x, 
	y:pos_init_m1.y, 
	w:32, 
	h:32
};

var monster2 = {	
	x:pos_init_m2.x,
	y:pos_init_m1.y, 
	w:32, 
	h:32
};

var monster3 = {	
	x:pos_init_m3.x,
	y:pos_init_m3.y,
	w:32,
	h:32
};


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// limites de posicion para los objetos
var limits = {x_pos: 194+(canvas.width / 2),
			  x_neg: -226+(canvas.width / 2),
			  y_pos: 170+(canvas.height / 2),
			  y_neg: -215+(canvas.height / 2)};


function initPosMonster(mounstro, pos_init){
	mounstro.x = pos_init.x;
	mounstro.y = pos_init.y;
}

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = (canvas.width / 2);
	hero.y = (canvas.height / 2);
	
	initPosMonster(monster,pos_init_m1);
	initPosMonster(monster2,pos_init_m2);
	initPosMonster(monster3,pos_init_m3);
	
	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * (canvas.width - 64));
	if(princess.x > limits.x_pos){
		princess.x = limits.x_pos;
	}	

	for(i=0; i<obstaculos.length; i++){
		if (colision(princess, obstaculos[i])){
			princess.y = obstaculos[i].y + obstaculos[i].h +1
		}
	}

	princess.y =  32+ (Math.random() * (canvas.height - 64));
	if(princess.y > limits.y_pos){
		princess.y = limits.y_pos;	
	}

	for(i=0; i<obstaculos.length; i++){
		if (colision(princess, obstaculos[i])){
			princess.x = obstaculos[i].x + obstaculos[i].w +1
		}
	}	
	
};


function colision(a,b) {
	if(a.x <= (b.x + b.w)
		&& b.x <= (a.x + 32)
		&& a.y <= (b.y + b.h)
		&& b.y <= (a.y + 32)){

		return true;
	}else{
		return false;
	}
};

function moverMonster(mounstro, modifier){	
 	if(mounstro.x < hero.x){ 			
 		mounstro.x += hero.speed * modifier/10;
 	}else{ 			
 		mounstro.x -= hero.speed * modifier/10;
 	}
 		
 	if(mounstro.y < hero.y){ 			
 		mounstro.y += hero.speed * modifier/10;
 	}else{ 			
 		mounstro.y -= hero.speed * modifier/10;
 	} 	
}

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up				
		if(hero.y < limits.y_neg){
			hero.y = limits.y_neg;						
		}else{
			hero.y -= hero.speed * modifier;			
		}	

		for(i=0; i<obstaculos.length; i++){
			if (colision(hero, obstaculos[i])){
				hero.y = obstaculos[i].y + obstaculos[i].h +1
			}
		}
		
	}
	if (40 in keysDown) { // Player holding down
		if(hero.y > limits.y_pos){
			hero.y = limits.y_pos;						
		}else{
			hero.y += hero.speed * modifier;			
		}

		for(i=0; i < obstaculos.length; i++){
			if (colision(hero, obstaculos[i])){
				hero.y = obstaculos[i].y - 32 -1
			}
		}	

	}
	if (37 in keysDown) { // Player holding left

		if(hero.x < limits.x_neg){
			hero.x = limits.x_neg;						
		}else{
			hero.x -= hero.speed * modifier;		
		}		

		for(i=0; i < obstaculos.length; i++){
			if (colision(hero, obstaculos[i])){
				hero.x = obstaculos[i].x + obstaculos[i].w +1
			}
		}	
	}
	if (39 in keysDown) { // Player holding right

		if(hero.x > limits.x_pos){
			hero.x = limits.x_pos;						
		}else{
			hero.x += hero.speed * modifier;			
		}		

		for(i=0; i<obstaculos.length; i++){
			if (colision(hero, obstaculos[i])){
				hero.x = obstaculos[i].x - 32 -1
			}
		}
	}
	
	moverMonster(monster,modifier);
	moverMonster(monster2,modifier);
	moverMonster(monster3,modifier);

	// Are they touching?
	if (hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		reset();
	}

	if(colision(hero, monster) 
		|| colision(hero, monster2)
		|| colision(hero, monster3)
	){
		princessesCaught = 0;
		reset();
	}

};



// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (stoneReady) {
		ctx.drawImage(stoneImage, pos_stone1.x, pos_stone1.y);
	}

	if (stone2Ready) {
		ctx.drawImage(stone2Image, pos_stone2.x, pos_stone2.y);
	}

	if (stone3Ready) {
		ctx.drawImage(stone3Image, pos_stone3.x, pos_stone3.y);
	}
	
	if (stone4Ready) {
		ctx.drawImage(stone4Image, pos_stone4.x, pos_stone4.y);
	}

	if (stone5Ready) {
		ctx.drawImage(stone5Image, pos_stone5.x, pos_stone5.y);
	}

	if (mounstro1Ready) {
		ctx.drawImage(mounstro1Image, monster.x, monster.y);		
	}
	
	if (mounstro2Ready) {
		ctx.drawImage(mounstro2Image, monster2.x, monster2.y);		
	}

	if (mounstro3Ready) {
		ctx.drawImage(mounstro3Image, monster3.x, monster3.y);		
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
	ctx.fillText("Level " + nivel, 400, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
