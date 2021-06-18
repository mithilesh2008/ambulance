class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
    this.xPos=0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
   
  getCars(){
    var getCar = database.ref('CarsAtEnd');
    getCar.on("value",(data)=>{
      this.rank=data.val();
      })
  }
// parameter abd argument
//parameter - receive some value
//argument - pass/ send some value
  static updateCars(rank){
    database.ref('/').update({
      CarsAtEnd: rank          
    });
  } 
  
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      xPos:this.xPos,
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
