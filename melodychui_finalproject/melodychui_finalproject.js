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
    } else if(input.includes("petals") || input.includes("pedals")){ //oftentime misoverheard so alternative detection
        noFill();
        stroke(0);
        strokeWeight(3);
        
        let num = 0;
        let numWords = {"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9}; 
        //had to do this manually since using parseInt to convert speech to numbers was not efficient

        for(let word in numWords){ //apparently needs seperate code for numbers above 10 as they no longer detect as words
            if(input.includes(word)) num = numWords[word]; //if the words detected as numbers, it translates automatically
        }        
        if(num == 0) { //catches any of the numbers that are not words, so that it does not become 0 and if it doesn't detect then it's counted as 0
            num = parseInt(input) || 0;
        }

        for(let i = 0; i < num; i++){ //draws out amount of petals
            let angle = (TWO_PI/num)*i; //spreads out evenly full circle depending on the amount 
            let x = windowWidth/2 + cos(angle)*40; //the *40 is the amount of pixels from the center
            let y = windowHeight/2 + sin(angle)*40;
            ellipse(x, y, 30, 30);
        }
    }
    
    /* else if(input=="red"){
        noStroke();
        fill(255, 22, 12);
        ellipse(windowWidth/2, windowHeight/2 - 40, 30, 50); //top petal
        ellipse(windowWidth/2, windowHeight/2 + 40, 30, 50); //bottom petal
        ellipse(windowWidth/2 - 40, windowHeight/2, 50, 30); //left petal
        ellipse(windowWidth/2 + 40, windowHeight/2, 50, 30); //right petal
    } */
}

//elements to add: color, num of petals, shapes, spikes, stems, vines, leaves, background color?, music?
//things to consider: shrinking size 

//NOTE TO SELF: CAN REFERENCE PREVIOUS SKETCH PETAL DESIGN
//in the end maybe have a wiggling/shaking/flowing design when pressed or hover 
//in the end to restart, have the wind blow all the flowers away?

//should i change to type generate so things can generate in sequence?