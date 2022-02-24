
/***********************************************************************************
  ClickableAllocator
  by Scott Kildall
  
  Start your localhost before running this, otherwise no PNGs will display

  Shows an example of how to use allocation tables with the
  modified p5.clickable class. This uses a ClickableManager class to
  (1) allocate and set variables from a .csv file
  (2) draw all the clickables that are visible in a single function


***********************************************************************************/

// the manager class
var clickablesManager;

// an array of clickable objects
var clickables;

// indexes into the array (constants)
const frequencyIndex = 0;
const sunlightIndex = 1;
const tempatureIndex = 2;
const positiveIndex = 3;
const negativeIndex = 4;


// pop soun
var popSound;
var podImg; 
var podImg;


// ALWAYS allocate the ClickableManager in the preload() function
// if you get an error here, it is likely the .csv file that is not the
// correct filename or path



function preload(){
  clickablesManager = new ClickableManager('assets/clickableLayout.csv');
  podImg = loadImage('assets/pod.png');
  musicImg = loadImage('assets/music.png');
}

// ALWAYS call the setup() funciton for ClickableManager in the setup(), after
// the class has been allocated in the preload() function.

function setup() {
  createCanvas(1480,800);

  // load the pop sound
  //soundFormats('mp3');
  popSound = loadSound('assets/pop.mp3');

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  // start with a red balloon
 
  // output to the message window
  console.log(clickables);
}




// Just draw the button
function draw() {
  background(255, 242, 218);
  rect(45,269,400,150);
  text("The mental health pod was created to make mental health services",60,300);
  text("accessible for all.This pod like structure is a private space made public.",60,320);
  text("These structures are located within public parks, prisions, schools,",60,340);
  text("office buildings and residences. This technology is sound proof",60,360);
  text("chamber programed with a sunlight and affection simulator, as well as",60,380);
  text("ai therapy and psychiatry amongst other features.",60,400);  



  // product name/slogan
function description() {
text("Fall Apart",60,260);
text("Publically, Privately",300,440);
  }

  //rect(1040,169,300,500);
 



  
  // draw "balloon"
  push();
  imageMode(CENTER);
  image(podImg,width/2,height/2);
  pop()


  
  // draw the p5.clickables
  clickablesManager.draw();

}

// change individual fields of the clickables
function setupClickables() {
  // set the pop, inflate and deflate to be false, we will change this after
  // first balloon gets pressed
  clickables[positiveIndex].visible = false;
  clickables[negativeIndex].visible = false; 

  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {

  if( this.id === sunlightIndex || this.id === tempatureIndex || this.id === frequencyIndex ) {
    newBalloon(this.id);
    blackWhite(this.id);
  }
  
// INFLATE OR DEFLATE
  else if( this.id === negativeIndex ) { 
    this.color = "#000000";
  }
  else if( this.id === positiveIndex ) {
    this.color = "#000000";
    }
  }


// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#9BA2F9";
  this.noTint = true;
  this.tint = "#9BA2F9";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // Change colors based on the id #
  if( this.id === positiveIndex || this.id === negativeIndex ) {
    this.color = "255, 242, 218";
  }
  else {
    this.color = "255, 242, 218";
  }

 
}

//--- BALLOON FUNCTIONS --

// when a new balloon is made, we show pop and inflate and deflate button,
// change fill color and reset ellipse diamter
function newBalloon(idNum) {
  clickables[positiveIndex].visible = true;
  clickables[negativeIndex].visible = true; 
 

  if( idNum === sunlightIndex) {
  tint("#F5E000");
  
  
  }
  else if( idNum === tempatureIndex) {
  tint("#F52D00");
    
  }
  else if( idNum === frequencyIndex) {
    podImg.blend(musicImg, 300, 300, 33, 100, 67, 0, 33, 100, ADD);
    image(musicImg, 500, 160);
    
  }
}

function blackWhite(idNum) { 
 if( idNum === positiveIndex) {
    tint("#000000");
  }
  else if( idNum === negativeIndex) {
  tint("#0000000");
  }
}

// if we pop the balloon, then you can't re-pop or inflate or deflate
function popBalloon() {
  popSound.play();
  ellipseDiameter = poppedEllipseDiameter;
}


