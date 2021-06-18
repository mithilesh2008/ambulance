class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
    
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    ambulance1 = createSprite(100,200);
    ambulance2 = createSprite(300,200);
    ambulance3 = createSprite(500,200);
    ambulance4 = createSprite(700,200);
    ambulance = [ambulance1, ambulance2,ambulance3, ambulance4];
    ambulance1.addImage("car1",ambulancei);
    ambulance2.addImage("car2",ambulancei);
    ambulance3.addImage("car3",ambulancei);
    ambulance4.addImage("car4",ambulancei);
    ambulance1.scale=0.3;
   ambulance2.scale=0.3;
   ambulance3.scale=0.3;
   ambulance4.scale=0.3;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCars();
    if(allPlayers !== undefined){
      background("blue");
      image(tracki,0,-displayHeight*4,displayWidth,displayHeight*5);
      leftPath = createSprite(200,-displayHeight*4,10,displayHeight);
      rightPath = createSprite(displayWidth-200,-displayHeight*4,10,displayHeight);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 170;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x=x+200;
        //position the cars a little away from each other in x direction
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
          player.xPos-=10;
          player.update();
          x = x+allPlayers[plr].xPos;
        }
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
          player.xPos+=10;
          player.update();
          x = x+allPlayers[plr].xPos;
        }
        ambulance[index-1].x = x;
        ambulance[index-1].y = y;
        if (index === player.index){
          stroke(10);
          fill("black");
          ellipse(x,y,100,100);
          ambulance[index - 1].shapeColor = "black";
          camera.position.x = displayWidth/2;
          camera.position.y =ambulance[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
     
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    

    if(player.distance>3800){
      gameState=2;
      player.rank=player.rank+1;// player.rank+=1 , player.rank++
      Player.updateCars(player.rank);
    }

    drawSprites();
  }
  end() {
    console.log("game ended");
  }
}
