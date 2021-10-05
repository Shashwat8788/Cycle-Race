var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var opponent1Img1,opponent1Img2,opponent1G;
var opponent2Img1,opponent2Img2,opponent2G;
var opponent3Img1,opponent3Img2,opponent3G;
var obstacle1Img,obstacle2Img,obstacle3Img;
var opponent1,opponent2,opponent3;
var gameOver,gameOverImg;
var obstacleImg1,obstacleImg2,obstacleImg3;
var bellSound;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images1/Road.png");
  mainRacerImg1 = loadAnimation("images1/mainPlayer1.png","images1/mainPlayer2.png");
  mainRacerImg2= loadImage("images1/mainPlayer3.png");
  opponent1Img1 = loadAnimation("images1/opponent1.png","images1/opponent2.png");
  opponent1Img2 = loadImage("images1/opponent3.png");
  opponent2Img1 = loadAnimation("images1/opponent4.png","images1/opponent5.png");
  opponent2Img2 = loadImage("images1/opponent6.png"); 
  opponent3Img1 = loadAnimation("images2/opponent7.png","images2/opponent8.png");
  opponent3Img2 = loadImage("images2/opponent9.png");
  obstacle1Img = loadImage("images2/obstacle1.png");
  obstacle2Img = loadImage("images2/obstacle2.png");
  obstacle3Img = loadImage("images2/obstacle3.png");
  gameOverImg = loadImage("images3/gameOver.png");
  obstacleImg1 = loadImage("images2/obstacle1.png");
  obstacleImg2 = loadImage("images2/obstacle2.png");
  obstacleImg3 = loadImage("images2/obstacle3.png");
  
  bellSound = loadSound("sound/bell.mp3");
}

function setup(){
  
  createCanvas(650,300);
  
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("stop",mainRacerImg2);
  mainCyclist.scale=0.07;
  mainCyclist.setCollider("rectangle",0,0,1200,1100);
  mainCyclist.debug = false;
  
  gameOver = createSprite(330,100,40,40);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;
  
  opponent1G = new Group();
  opponent2G = new Group();
  opponent3G = new Group();
  obstacleG = new Group();
  
}

function draw() {
  background(0);
  
  if(gameState===PLAY){
  
    mainCyclist.y = World.mouseY;
    
    distance = distance + Math.round(getFrameRate()/50);
    
    spawnObstacles();
    
    if(keyDown("space")){
      bellSound.play();
    }
    
    var opponent_ = Math.round(random(1,3))
    
    if(World.frameCount%100==0){
      if(opponent_==1){
        opponent_1();
      } else if(opponent_==2){
        opponent_2();
      } else if(opponent_==3){
        opponent_3();
      } 
    }
  
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
  
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
    
    if(mainCyclist.isTouching(opponent1G)||mainCyclist.isTouching
       (opponent2G)||mainCyclist.isTouching(opponent3G)||
       mainCyclist.isTouching(obstacleG)){
      gameState = END;
     
      if(mainCyclist.isTouching(opponent1G)){
         opponent1.changeAnimation("stop1",opponent1Img2);  
      }
      if(mainCyclist.isTouching(opponent2G)){
         opponent2.changeAnimation("stop2",opponent2Img2);   
      }
      if(mainCyclist.isTouching(opponent3G)){
         opponent3.changeAnimation("stop3",opponent3Img2);   
      }
      
      opponent1G.setVelocityXEach(0);
      opponent2G.setVelocityXEach(0);
      opponent3G.setVelocityXEach(0);
      obstacleG.setVelocityXEach(0);
      mainCyclist.velocityX = 0;
      path.velocityX = 0;
    }
    
    
  }
  
  if(gameState===END){
    mainCyclist.changeAnimation("stop",mainRacerImg2);
    opponent1G.setLifetimeEach(-1);
    opponent2G.setLifetimeEach(-1);
    opponent3G.setLifetimeEach(-1);
    obstacleG.setLifetimeEach(-1);
    gameOver.visible = true;
    
    if(keyDown("UP_ARROW")){
      reset();
    }
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,500,30);
}

function opponent_1(){
   opponent1 =                                                     createSprite(655,Math.round(random(50,250)),40,40);
  opponent1.addAnimation("cycling",opponent1Img1);
  opponent1.addAnimation("stop1",opponent1Img2);
  opponent1.scale = 0.065;
  opponent1.velocityX = -(4+distance/150);
  opponent1.lifetime = 200;
  opponent1G.add(opponent1);
  opponent1.setCollider("rectangle",0,0,1200,1100);
  opponent1.debug = false;
  opponent1.depth = mainCyclist.depth;
  mainCyclist.depth = mainCyclist.depth+1;
}  

function opponent_2(){
  opponent2 =                                                     createSprite(655,Math.round(random(50,250)),40,40);
  opponent2.velocityX = -(4+distance/150);
  opponent2.addAnimation("cycling",opponent2Img1);
  opponent2.addAnimation("stop2",opponent2Img2);
  opponent2.scale = 0.065;
  opponent2.lifetime = 200;
  opponent2G.add(opponent2);
  opponent2.setCollider("rectangle",0,0,1200,1100);
  opponent2.debug = false;
  opponent2.depth = mainCyclist.depth;
  mainCyclist.depth = mainCyclist.depth+1;
}

function opponent_3(){
  opponent3 =                                                     createSprite(655,Math.round(random(50,250)),40,40);
  opponent3.velocityX = -(4+distance/150);
  opponent3.addAnimation("cycling",opponent3Img1);
  opponent3.addAnimation("stop3",opponent3Img2);
  opponent3.scale = 0.065;
  opponent3.lifetime = 200;
  opponent3G.add(opponent3);
  opponent3.setCollider("rectangle",0,0,1200,1100);
  opponent3.debug = false;
  opponent3.depth = mainCyclist.depth;
  mainCyclist.depth = mainCyclist.depth+1;
}

function spawnObstacles(){
  if(frameCount%60==0){
   var obstacle = createSprite(655,Math.round(random(50,250)),40,40);
    obstacle.velocityX = -(4+distance/150);
    
    var obstacle1 = Math.round(random(1,3));
    switch(obstacle1) {
      case 1: obstacle.addImage(obstacleImg1);
              break;
      case 2: obstacle.addImage(obstacleImg2);
              break;
      case 3: obstacle.addImage(obstacleImg3);
              break;
      default: break;        
    }
    
    obstacle.scale = 0.065;
    obstacle.lifetime = 650/2;
    obstacle.setCollider("rectangle",0,0,500,500);
    obstacle.debug = false;
    obstacleG.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  opponent1G.destroyEach();
  opponent2G.destroyEach();
  opponent3G.destroyEach();
  obstacleG.destroyEach();
  distance = 0;
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
}