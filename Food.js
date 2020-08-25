var currentTime;

class Food {
    constructor(){
      this.foodStock=0;
      this.image=loadImage('images/Food Stock.png');
      this.bedroom = loadImage('images/Bed Room.png');
      this.washroom = loadImage("images/Wash Room.png");
      this.garden = loadImage("images/Garden.png");
      this.vaccine = loadImage("images/dogVaccination.png");
      this.sleeping = loadImage("images/Lazy.png");
      var currentTime;
    }
  
    updateFoodStock(foodStock){
      this.foodStock=foodStock;
    }

    deductFood(){
      if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
      }
    }

    getFoodStock(){
      return this.foodStock;
    }

    bedroom(){
      dog.addImage(this.bedroom, 550, 550);
    }

    washroom(){
      dog.addImage(this.washroom, 550, 550);
    }

    garden(){
      dog.addImage(this.garden, 550, 550);
    }
    
    vaccine(){
      dog.addImage(this.vaccine, 550, 550);
    }

    sleeping(){
      dog.addImage(this.sleeping, 550, 550);
    }
    currentTime = hour();

  
    display(){
      var a = 100, b = -25; 
      
      imageMode(CENTER);
      image(this.image,50,690,70,70);

      database.ref("/").update({"CurrentTime": hour()});
      database.ref("CurrentTime").on("value",(data)=>{
          this.currentTime = data.val();
      });
      
      if(this.foodStock!=0){
        for(var k=0;k<this.foodStock;k++){
          if(k%10==0){
            a=750;
            b=b+50;
          }
          image(this.image,a,b,50,50);
          a=a+50;
        }
      }
    }
  }