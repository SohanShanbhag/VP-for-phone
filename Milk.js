class Milk {
  constructor(){
  this.milkStock=0;
  this.lastFed;
  this.image=loadImage('images/Milk.png');
  }

 updateMilkStock(milkStock){
  this.milkStock=milkStock;
 }

 getFedTime(lastFed){
   this.lastFed=lastFed;
 }

 deductMilk(){
   if(this.milkStock>0){
    this.milkStock=this.milkStock-1;
   }
  }

  getMilkStock(){
    return this.milkStock;
  }

  display(){
    var x=100,y=-25;
    
    imageMode(CENTER);
    image(this.image,100,690,70,70);
    
    if(this.milkStock!=0){
      for(var i=0;i<this.milkStock;i++){
        if(i%10==0){
          x=1250;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  }
}