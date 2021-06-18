var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1i,car2i,car3i,car4i,tracki,groundi;
var form, player, game;
var leftPath,rightPath;
var ambulance, ambulance1, ambulance2, ambulance3, ambulance4;

function preload(){
  car1i=loadImage("images/car1.png");
  car2i=loadImage("images/car2.png");
  car3i=loadImage("images/car3.png");
  car4i=loadImage("images/car4.png");
  ambulancei=loadImage("images/ambulance.png");
  tracki=loadImage("images/track.jpg");
  trucki=loadImage("images/truck.png");
  pat1i=loadImage("images/pat1.png");
  pat2i=loadImage("images/pat2.png");
  pat3i=loadImage("images/pat3.png");
  hospitali=loadImage("images/hospital.jpg");
  stoperi=loadImage("images/stoper.png");
  groundi=loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  
}


function draw(){
  if(playerCount === 4){
    game.update(1);
    spawncars();
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  drawSprites();
}
function spawncars() {
   if (frameCount % 20 === 0) {
    car = createSprite(600,-10,40,10);
    car.x = Math.round(random(200,displayWidth-200));

    var r=Math.round(random(1,4))
    switch(r) {
      case 1: car.addImage(car1i);
              break;
      case 2: car.addImage(car2i);
              break;
      case 3: car.addImage(car3i);
              break;
      case 4: car.addImage(car4i);
              break;
      default: break;
    }
       
     //assign lifetime to the variable
     car.lifetime = 134;
    
    //adjust the depth
   
    }
}
