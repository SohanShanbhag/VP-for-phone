var dog, database, milkS, milkStock, foodS, foodStock;
var fedTime, lastFed;
var drink, addMilk, feed, addFood;
var milkObj, input;
var bedImg, washroomImg, gardenImg, vaccineImg, sleepingImg;
var gameState;

var dogStatus;

function preload()
{
  dogImg = loadImage('dogImg.png');
  happyDogImg = loadImage('dogImg1.png');
  bedImg = loadImage("Bed Room.png");
  washroomImg = loadImage("Wash Room.png");
  gardenImg = loadImage("Garden.png");
  vaccineImg = loadImage("dogVaccination.png");
  sleepingImg = loadImage("Lazy.png");

  happySound = loadSound("pup2.mp3");
  playSound = loadSound("dog3.mp3");
}

function setup() {
  database = firebase.database();

  createCanvas(1530, 730);
  
  dog = createSprite(330, 600);
  dog.addImage(dogImg);  
  dog.scale = 0.3;

  readState = database.ref('gameState');
  readState.on('value', function(data){
    gameState = data.val();
  })

  input = createInput('');
  input.position(12, 500);

  milkStock = database.ref('Milk');
  milkStock.on('value', readStock);

  foodStock = database.ref('Food');
  foodStock.on('value', readStock2);

  milkObj = new Milk();
  foodObj = new Food();

  addMilk = createButton("Add Milk");
  addMilk.position(85, 225);
  addMilk.mousePressed(addMilks);

  drink = createButton("Give milk");
  drink.position(210, 225);
  drink.mousePressed(feedMilk);

   feed = createButton("Feed " + input.value());
   feed.position(210, 295);
   feed.mousePressed(feedDog);

   addFood = createButton("Add Food");
   addFood.position(85, 295);
   addFood.mousePressed(addFoods);

   sleep = createButton("Take A Nap");
   sleep.position(130, 365);

   play = createButton("Play In The Garden");
   play.position(220, 365);

   wash = createButton("Take A Bath");
   wash.position(360, 365);

   vaccineB = createButton("Vaccine Schedule");
   vaccineB.position(455, 365)
}

function bedroom(){
  dog.addImage(bedImg, 550, 550);
}

function washroom(){
  dog.addImage(washroomImg, 550, 550);
}

function garden(){
  dog.addImage(gardenImg, 550, 550);
}

function vaccine(){
  dog.addImage(vaccineImg, 550, 550);
}

function sleeping(){
  dog.addImage(sleepingImg, 550, 550);
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}

function draw(){
  background("green"); 

  fill("white");
  textSize(18);
  text("Name your dog in the box below", 10, 470);

  sleep.mousePressed(sleeps);
  play.mousePressed(plays);
  wash.mousePressed(washes);
  vaccineB.mousePressed(dogVaccination);

  dogStatus = String(gameState);
  if(dogStatus !== undefined){
    text("Dog is Currently :  " + dogStatus, 5, 115)
  }

  text("Milk : ", 5, 230);
  text("Food : ", 5, 300)
  text("Extra Actions : ", 5, 370)

  if(milkS !== undefined){
    textSize(30);
    fill("white")
    text("Milk stock remaining : " + milkS + " [Maximum - 140]", 5  , 30);
  }

  database.ref("/").update({"CurrentTime": hour()});
  database.ref("CurrentTime").on("value",(data)=>{
      this.currentTime = data.val();
  });

  if(foodS !== undefined){
    textSize(30);
    fill("white")
    text("Food stock remaining : " + foodS + " [Maximum - 140]", 5  , 80);
  }

  milkObj.display();
  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on('value', function(data){
    this.lastFed = data.val();
  })

  fill(255,255,254);
  textSize(20); 
  if(lastFed>=12 && lastFed !== undefined){
    text("Last Feed for "+ input.value() +" : " +  lastFed%12 + " PM", 5,150);
   }else if(lastFed==0 && lastFed !== undefined){
     text("Last Feed for "+ input.value() +" : 12 AM",5,80);
   }else if(lastFed < 12 && lastFed !== undefined){
     text("Last Feed for "+ input.value() +" : " +  lastFed + " AM", 5,150);
  }



  drawSprites();
  
  console.log(gameState);
  console.log();

  if(milkS === 140){
    addMilk.hide();
    textSize(10)
    text("Maximum Amount Reached!", addMilk.x - 30 , addMilk.y + 5)
  }else{
    addMilk.show();
  }if(milkS === 0){
    drink.hide();
  }

  if(foodS === 140){
    addFood.hide();
    textSize(10)
    text("Maximum Amount Reached!", addFood.x - 25 , addFood.y + 5)
  }else{
    addFood.show();
  }if(foodS === 0){
    feed.hide();
  }

}

function readStock(data){
  milkS = data.val();
  milkObj.updateMilkStock(milkS);
}

 function readStock2(data){
   foodS = data.val()
   foodObj.updateFoodStock(foodS);
 }

function feedMilk(){
  happySound.play();
  dog.addImage(happyDogImg);
  update("Drinking Milk");
  milkObj.updateMilkStock(milkObj.getMilkStock() - 1)
  database.ref('/').update({
    Milk: milkObj.getMilkStock(),
    FeedTime: hour()
  })

}

function addMilks(){
    milkS++;
    database.ref('/').update({
      Milk:milkS
  })
} 

 function feedDog(){
   dog.addImage(happyDogImg);
   happySound.play();
   update("Eating Food (Specific And Healthy Dog Food ^_^)")
     foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
     database.ref('/').update({
       Food: foodObj.getFoodStock(),
       FeedTime: hour()
     })
 }

 function addFoods(){
   if(foodS < 140){
     foodS++;
     database.ref('/').update({
       Food:foodS
     })
   }
 }

 function sleeps(){
   dog.addImage(bedImg);
   update("Sleeping");
 }

 function plays(){
   dog.addImage(gardenImg);
   playSound.play();
   update("Playing");
 }

 function washes(){
   dog.addImage(washroomImg);
   update("Bathing")
 }

 function dogVaccination(){
   dog.addImage(vaccineImg);
   update("Checking Vaccine Schedule")
 }