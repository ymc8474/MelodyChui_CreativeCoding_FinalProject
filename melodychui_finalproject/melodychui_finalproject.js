//Class: Creative Coding 
//Idea: Voice Activated Flowers
//By: Melody Chui

// --- REFERENCE LINKS ---
//voice drawing reference: https://editor.p5js.org/Tiri/sketches/cAGGZxMTR

// --- NOTES ---
//14" MacbookPro Window Width: 1512px
//14" MacbookPro Window Height: 982px
//In order to make it work on Open Processing, I think the sound library needs to be added to the index

let recording = new p5.SpeechRec(); //
recording.onResult = detection; 
recording.start(true,true); //starts listening

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255); //white (not in draw loop so it does not cover the drawing on each new added frame)
}

function draw() {
    
}

function detection() {
    let input=recording.resultString.toLowerCase();
    console.log(input); //for personal reference to see whether it is detecting the right words

    if(input=="start"){
        noStroke();
        fill(139, 128, 0);
        ellipse(windowWidth/2, windowHeight/2, 50) //starting flower center
    } else if(input=="petals" || input=="pedals"){ //often time misoverheard
        noFill();
        stroke(0); //black
        strokeWeight(5);
        ellipse(windowWidth/2, windowHeight/2 - 40, 30, 50); //top petal
        ellipse(windowWidth/2, windowHeight/2 + 40, 30, 50); //bottom petal
        ellipse(windowWidth/2 - 40, windowHeight/2, 50, 30); //left petal
        ellipse(windowWidth/2 + 40, windowHeight/2, 50, 30); //right petal
    } else if(input=="red"){
        noStroke();
        fill(255, 22, 12);
        ellipse(windowWidth/2, windowHeight/2 - 40, 30, 50); //top petal
        ellipse(windowWidth/2, windowHeight/2 + 40, 30, 50); //bottom petal
        ellipse(windowWidth/2 - 40, windowHeight/2, 50, 30); //left petal
        ellipse(windowWidth/2 + 40, windowHeight/2, 50, 30); //right petal
    }
}

//elements to add: color, num of petals, shapes, spikes, stems, vines, leaves, background color?, music?
//things to consider: shrinking size 

//NOTE TO SELF: CAN REFERENCE PREVIOUS SKETCH PETAL DESIGN
//in the end maybe have a wiggling/shaking/flowing design when pressed or hover 
//in the end to restart, have the wind blow all the flowers away?

//should i change to type generate so things can generate in sequence?