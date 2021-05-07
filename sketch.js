var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var fedfood;
var foodObj;
var feedTime;
var lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  fedFood=createButton("Fed Food")
  fedFood.position(700,95)
  fedFood.mousePressed(feedDog)
  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  feedTime=database.ref('FeedTime')
  feedTime.on("value",(data)=>{
    lastFed=data.val()
  })
  fill("PINK")
  textSize(15)
  if(lastFed>=12){
    text("LAST FEED : "+lastFed%12+"PM",300,30)


  }else if(lastFed===0){
    text("LAST FEED : 12 AM ",300,30)
  }else{
    text("LAST FEED :   "+lastFed+"AM",300,30)
  }
   
  

  



 

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val= foodObj.getFoodStock();
  if(food_stock_val <= 0){ foodObj.updateFoodStock (food_stock_val *0);
  }else{
  foodObj.updateFoodStock (food_stock_val -1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


