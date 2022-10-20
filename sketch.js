var playerName, playerNameBox;
var gameState;
var newJoineeTitle, newJoineeSub;
var introTimer;
var burritoUnion, trailOfDestiny;
var comingSoon, comingSoonSub;


function setup() {

  createCanvas(windowWidth-10, windowHeight-10);

  newJoineeTitle = createElement("h1","Hello There Stranger!");
  newJoineeTitle.position(windowWidth/2.575,windowHeight/10)
  newJoineeSub = createElement("h2","Enter your Username Below :)");
  newJoineeSub.position(windowWidth/2.575,windowHeight/5);

  playerNameBox = createInput();
  playerNameBox.position(windowWidth/2-75,windowHeight/2);

  burritoUnion = createElement("h1","BurritoUnion Presents:");
  burritoUnion.position(windowWidth/2-150,windowHeight/2.5);

  trailOfDestiny = createElement("h1","The Trail of Destiny!");
  trailOfDestiny.position(windowWidth/2-150,windowHeight/2.5);

  comingSoon = createElement("h1","It's Going To Be Awesome!");
  comingSoon.position(windowWidth/2-175,windowHeight/2.5);

  comingSoonSub = createElement("h2","coming soon (maybe this holiday?)");
  comingSoonSub.position(windowWidth/2-170, windowHeight/2);

}

function draw() {

  playerName = localStorage.getItem("playerName");

  if(playerName === null) {

    gameState = undefined;

    background("lime");

    newJoineeTitle.show();
    newJoineeSub.show();
    playerNameBox.show();

    if(keyWentDown("enter")) {
      localStorage.setItem("playerName",playerNameBox.value());
      location.reload();
    }

  } else {

    newJoineeTitle.hide();
    newJoineeSub.hide();
    playerNameBox.hide();

    introTimer = frameCount;

  }

  if(introTimer<200) {
    burritoUnion.show();
  } else {
    burritoUnion.hide();
  }

  if(introTimer>250 && introTimer<450) {
    trailOfDestiny.show();
    dancingBackground();
  }  else {
    trailOfDestiny.hide();
  }

  if(introTimer>500) {

    background("white");
    comingSoon.show();
    comingSoonSub.show();

  } else {
    
    comingSoon.hide();
    comingSoonSub.hide();

  }

}

function dancingBackground() {

  var x = Math.round(random(1,5));

  if(frameCount%10 === 0) {
    if(x === 1) {
      background("lime");
    } else if(x === 2) {
      background("cyan");
    } else if(x === 3) {
      background("orange");
    } else if(x === 4) {
      background("purple");
    } else if(x === 5) {
      background("blue");
    }
  }

}
