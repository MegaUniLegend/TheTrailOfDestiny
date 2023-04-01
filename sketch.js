var gameState;
var introTimer;
var burritoUnion, trailOfDestiny;
var lobbyBg, lobbyBgImg, lobbyMusic;
var lvlbutton, inflvlbutton, skinbutton;
var cube, cubeskin, cubeskin1, cubeskin2, cubeskin3, cubeskin4;
var skintitle, skinsubtitle;
var rightarrow, leftarrow;
var rightarrowImg, leftarrowImg;
var ground;
var spikes, spikeImg, spikeImg1, spikeImg2, spikeImg3;
var objgrp,spikegrp;
var score, highscore;
var infgameState, gameovertxt;
var infrestartbutton, menureturnbutton;
var jumphelptxt;
var levelname, difficulty, music, credits;
//var levelnametxt, difficultytxt, musictxt, creditstxt;
var playlvlbutton;
var levelstate, cubestate, gravitystate;
var o11, o12, o13, o14;

var lvlmusic1;

function preload() {
    lobbyBgImg = loadImage("Images/background.gif");
    cubeskin1 = loadImage("Images/cubeskin1.png");
    cubeskin2 = loadImage("Images/cubeskin2.png");
    cubeskin3 = loadImage("Images/cubeskin3.png");
    cubeskin4 = loadImage("Images/cubeskin4.png");
    rightarrowImg = loadImage("Images/rightarrow.png");
    leftarrowImg = loadImage("Images/leftarrow.png");
    spikeImg1 = loadImage("Images/spike1.png");
    spikeImg2 = loadImage("Images/spike2.png");
    spikeImg3 = loadImage("Images/spike3.png");
    lobbyMusic = loadSound("Music/weirddream.mp3");
    lvlmusic1 = loadSound("Music/midnight.mp3");
}

function setup() {

    createCanvas(windowWidth-5,windowHeight-5);

    gameState = 0;
    introTimer = 0;

    lobbyBg = createImg("Images/background.gif");
    lobbyBg.size(width,height);
    lobbyBg.position(0,0);

    burritoUnion = createElement("h1","BurritoUnion Presents:");
    burritoUnion.position(width/2-150,height/2.5);
    trailOfDestiny = createElement("h1","The Trail Of Destiny!");
    trailOfDestiny.position(width/2-150,height/2.5);

    gameovertxt =  createElement("h1","Game Over!")
    gameovertxt.position(width/2-75,height/2.5);
    gameovertxt.hide();

    lvlbutton = createButton("Very Hard Levels!");
    lvlbutton.position(width/2-50,height/2);
    lvlbutton.mouseClicked(premadeLvl);

    inflvlbutton = createButton("Endless Play!");
    inflvlbutton.position(width/2-35,height/1.75);
    inflvlbutton.mouseClicked(infiniteLvl);

    menureturnbutton = createButton("Return to menu!");
    menureturnbutton.position(width/2-50,height/1.5);
    menureturnbutton.mouseClicked(menuReturn);
    menureturnbutton.hide();

    infrestartbutton = createButton("Play again?");
    infrestartbutton.position(width/2-45,height/1.75);
    infrestartbutton.mouseClicked(infrestart);
    infrestartbutton.hide();

    playlvlbutton = createButton("Start!")
    playlvlbutton.position(width/2-20, height/1.6);
    playlvlbutton.mouseClicked(startlvl);
    playlvlbutton.hide();

    jumphelptxt = createElement("h1","Press 'w' or click on the screen to jump");
    jumphelptxt.position(width/2-250,height/3);
    jumphelptxt.hide();

    skinbutton = createButton("Change Skins!");
    skinbutton.position(width/2-37.5,height/1.55);
    skinbutton.mouseClicked(skinmenu);

    cube = new Sprite(width/2,height-60,450,450);
    cubeskin = localStorage.getItem("skin");

    ground = new Sprite(0,height-25,width*2,20);
    ground.visible = false;

    skintitle = createElement("h1","Select Your Character's Skin!");
    skintitle.position(width/2-200,height/10);
    skinsubtitle = createElement("h2","More are on their way soon :)");
    skinsubtitle.position(width/2-150,height/5);
    rightarrow = new Sprite(width/1.75,height/2,1000,1000);
    rightarrow.addImage(rightarrowImg);
    rightarrow.scale = 0.05;

    leftarrow = new Sprite(width/2.5, height/2,1000,1000);
    leftarrow.addImage(leftarrowImg);
    leftarrow.scale = 0.05;

    //levelnametxt = createSprite(width/2,height/10, 500, 50);
    //difficultytxt = createSprite(width/2,height/2.5, 500, 50);
    //musictxt = createSprite(width/2, height/2.25, 500, 50);
    //creditstxt = createSprite(width/2, height/2.1, 500, 50);

    objgrp = new Group();
    spikegrp = new Group();

    score = 0;

    lobbyMusic.play();

}

function draw() {

    background("lightblue");

    if(cubeskin === null || cubeskin === undefined) {
        localStorage.setItem("skin", "one");
        location.reload();
    }

    cubeskin = localStorage.getItem("skin");

    if(cubeskin === "one") {
    cube.addImage(cubeskin1);
    cube.scale = 0.1;
    cube.width = 50;
    cube.height = 50;
    }

    if(cubeskin === "two") {
        cube.addImage(cubeskin2);
        cube.scale = 0.05;
        cube.width = 50;
        cube.height = 50;
    }

    if(cubeskin === "three") {
        cube.addImage(cubeskin3);
        cube.scale = 0.04;
        cube.width = 50;
        cube.height = 50;
    }

    if(cubeskin === "four") {
        cube.addImage(cubeskin4);
        cube.scale = 0.06;
        cube.width = 50;
        cube.height = 50;
    }
    cube.x = width/2

    highscore = localStorage.getItem("highscore");

    if(gameState === 0) {

        introTimer +=1;

        if(introTimer<=200) {
            burritoUnion.show();
        }else{
            burritoUnion.hide();
        }

        if(introTimer >= 250 && introTimer <= 450) {
            trailOfDestiny.show();
        }else{
            trailOfDestiny.hide();
        }

        if(introTimer === 500) {
            gameState = 1;
            introTimer = null;
        }

    }

    if(gameState === 1) {

        lvlbutton.show();
        inflvlbutton.show();
        skinbutton.show();

    }else{

        lvlbutton.hide();
        inflvlbutton.hide();
        skinbutton.hide();

    }

    if(gameState === 2) {
        if(levelname === undefined) {
            levelname = "Melrose At Midnight";
        }

        if(levelname === "Melrose At Midnight") {
            difficulty = "hard";
            music = "Melrose At Midnight";
            credits = "Light Years Away - NCS";
        }

        textSize(30);
       // levelnametxt.text = levelname + "(Coming SOON)";
       // difficultytxt.text = "Difficulty:"+ difficulty;
      //  musictxt.text = "Music: "+ music;
      //  creditstxt.text = "Composer: "+ credits;


        if(levelstate === "play") {
            camera.on();
            camera.x = cube.x;
            if(cube.colliding(objgrp)) {
                console.log("ae");
            }
        }

        if(cubestate === "cube" && gravitystate === "normal") {
            cube.velocity.y +=0.5;
            if(kb.pressing("up")) {
                if(cube.y >572 || cube.colliding(objgrp))
                cube.velocity.y = -11;
                cube.rotate(180,4.5);
            }
    
            if(cube.y > 573.5000000000002) {
                cube.y = 573.5000000000002;
                cube.rotation = 0;
            }
        }
    }

    if(gameState === 3) {

        if(highscore === null) {
            localStorage.setItem("highscore",0);
        }

        textSize(30);
        text("Your Score Is:"+ score, width/2-550, height/10);
        text("Your Highscore:"+highscore,width/2-550,height/6);

        objgrp.add(ground);

        if(infgameState === "play") {

            cube.velocity.y +=0.5;
       // cube.velocity.x = 5;
       // cube.depth +=1;
       // background.depth +=1;

        

        if(kb.pressing("up") && cube.y >= 572) {
            cube.velocity.y = -11;
            cube.rotate(180,4.5);
            jumphelptxt.hide();
        }

        if(cube.y > 573.5000000000002) {
            cube.y = 573.5000000000002;
            if(cube.rotation >= 90 && cube.rotation <= 270) {
                cube.rotation = 180;
            }else {
                cube.rotation = 0;
            }
        }

        if(frameCount % 100 === 0) {
            score +=1;
        }

        if(frameCount % 50 === 0) {
            spikes = new Sprite(width+50, height/1.2);
            spikeImg = Math.round(random(1,3))
            if(spikeImg === 1) {
                spikes.addImage(spikeImg1);
                spikes.scale = 0.250;
                spikes.y += 85;
                spikes.h = 15;
                spikes.w = 100;
            }else if(spikeImg === 2) {
                spikes.addImage(spikeImg2);
                spikes.scale = 0.18;
                spikes.w = 30;
                spikes.h = 70;
                spikes.y += 47.5;
            }else if(spikeImg === 3) {
                spikes.addImage(spikeImg3);
                spikes.scale = 0.4;
                spikes.w = 80;
                spikes.h = 40;
                spikes.y += 65;
            }
            if(spikes.x < cube.x) {
                spikes.remove();
            }
            spikes.velocity.x = -(6+frameCount/1000);
            spikegrp.add(spikes);

        }

    }

    if(cube.collides(spikegrp)) {
        infgameState = "dead";
        lvlmusic1.stop();
    }
    
    if(infgameState === "dead") {
        if(score > highscore) {
            localStorage.setItem("highscore",score);
            alert("Congrats! you have a new highscore.");
        }
        spikegrp.removeAll();
        score = 0;
        menureturnbutton.show();
        infrestartbutton.show();
        gameovertxt.show();

    }
    }

    if(gameState === 4) {

        skintitle.show();
        skinsubtitle.show();
        rightarrow.visible = true;
        leftarrow.visible = true;

        cube.y = 459;
        cube.velocity.y = 0;

        if(rightarrow.mouse.released()) {

            if(cubeskin === "one") {
            //    cubeskin = "two"
                localStorage.setItem("skin","two");
            //    cubeskin = localStorage.getItem("skin");
            }

            if(cubeskin === "two") {
            //    cubeskin = "three"
                localStorage.setItem("skin", "three");
            //    cubeskin = localStorage.getItem("skin");
            }

            if(cubeskin === "three") {
            //    cubeskin = "four";
                localStorage.setItem("skin", "four");
            //    cubeskin = localStorage.getItem("skin");
            }
        }

        if(leftarrow.mouse.released()) {

            if(cubeskin === "four") {
            //    cubeskin = "three";
                localStorage.setItem("skin", "three");
            //    cubeskin = localStorage.getItem("skin");
            }

            if(cubeskin === "three") {
            //    cubeskin = "two"
                localStorage.setItem("skin", "two");
            //    cubeskin = localStorage.getItem("skin");
            }
            

            if(cubeskin === "two") {
            //    cubeskin = "one"
                localStorage.setItem("skin", "one");
            //    cubeskin = localStorage.getItem("skin");
            }
        } 

        if(kb.pressed("backspace") || kb.pressed("escape")) {
            gameState = 1;
            skintitle.hide();
            skinsubtitle.hide();
            rightarrow.visible = false;
            leftarrow.visible = false;

            lobbyBg.show();
        }

    }else{

        skintitle.hide();
        skinsubtitle.hide();
        rightarrow.visible = false;
        leftarrow.visible = false;

    }

    //cube.debug = true;
   // console.log(cube.x);
   // console.log(cube.y);
   // console.log(gameState);
  //  console.log(levelstate);
  //  console.log(gravitystate);
  //  drawSprites();

}

function premadeLvl() {
    /*gameState = 2;
    lobbyBg.hide();
    playlvlbutton.show();
    cube.y = 500;
    cube.velocity.y = 0;*/
    alert("This section is under development, It requires a lot of time to make the obstacles unique, match the rhythm. These levels will be designed from the base. (Probably will come in late June!) Instead try out the infinite mode!")
}

function infiniteLvl() {
    gameState = 3;
    //alert("This gamemode may have a few glitches which you may notice while playing, I am currently experimenting P5 version 3 as I just replaced it with version 2 recently.");
    infgameState = "play";
    cube.y = 459;
    cube.velocity.y = 1;
    frameCount = 0;
    lobbyBg.hide();
    jumphelptxt.show();
    lobbyMusic.stop();
    lvlmusic1.play();
}

function skinmenu() {
    gameState = 4;
    lobbyBg.hide();
    cube.y = 459;
    menureturnbutton.show();
    //alert("Press escape or backspace to return to lobby!");
}

function menuReturn() {
    gameState = 1;
    lobbyBg.show();
    menureturnbutton.hide();
    infrestartbutton.hide();
    gameovertxt.hide();
    cube.rotate(0,10);
    jumphelptxt.hide();
    lobbyMusic.stop();
    lobbyMusic.play();
}

function infrestart() {
    gameState = 3;
    frameCount = 0;
    cube.rotate(0,10);
    cube.y = 0;
    infgameState = "play";
    menureturnbutton.hide();
    infrestartbutton.hide();
    gameovertxt.hide();
    lvlmusic1.play();
    
}

function mousePressed() {
    if(gameState === 3 && infgameState === "play" && cube.y > 572) {
        cube.velocity.y = -11;
        cube.rotate(180,4.5);
        jumphelptxt.hide();
    }
}

function startlvl() {

    playlvlbutton.hide()
    levelnametxt.visible = false;
    difficultytxt.visible = false;
    musictxt.visible = false;
    creditstxt.visible = false;

    cube.velocity.y = 0;
    cube.y = 500;

    if(levelname === "Melrose At Midnight") {
        levelstate = "play";
        cubestate = "cube";
        gravitystate = "normal"
        lvlmusic1.play();

        o11 = new obstacle(width+100, height-50, 1000, 25, objgrp);
        o11.movement(3,0,"kinematic");

        o12 = new obstacle(width+200, height - 100, 200, 25, objgrp);
        o12.movement(3,0, "kinematic");

        o13 = new obstacle(width+300, height - 150, 200, 25, objgrp);
        o13.movement(3,0, "kinematic");
    }
}

