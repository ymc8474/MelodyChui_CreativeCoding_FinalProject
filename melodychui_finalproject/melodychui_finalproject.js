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

let flowerSize = 40; //to allow the flower to grow bigger or smaller (default is 40px from semester as that is the radius)
let stemSize = 5; //adjust the thickness of stem (default 5px)
<<<<<<< HEAD
let bgCol; //adjusts the background color
=======
>>>>>>> 05ec70bd1238a49ea6712e38a7b9e4ae33d8c79a

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
        ellipse(windowWidth/2, windowHeight/2, size) //starting flower center
    } else if(input.includes("petals") || input.includes("pedals")){ //oftentime misoverheard so alternative detection
    //default: round/circlular petal design
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
            let x = windowWidth/2 + cos(angle)*flowerSize; //the *40 is the amount of pixels from the center
            let y = windowHeight/2 + sin(angle)*flowerSize;
            ellipse(x, y, 30, 30);
        }
    } else if(input=="red") { //if the color red is assigned to the flower, it fills in all the petals accordingly
        noStroke();
        fill(255, 22, 12); //red
        for(let i = 0; i < lastNum; i++){
            let angle = (TWO_PI/lastNum)*i;
            let x = windowWidth/2 + cos(angle)*flowerSize;
            let y = windowHeight/2 + sin(angle)*flowerSize;
            ellipse(x, y, 30, 30);
        }
    } else if(input=="blue") { //fills in blue petals
        noStroke();
        fill(0, 71, 171); //blue
        for(let i = 0; i < lastNum; i++){
            let angle = (TWO_PI/lastNum)*i;
            let x = windowWidth/2 + cos(angle)*flowerSize;
            let y = windowHeight/2 + sin(angle)*flowerSize;
            ellipse(x, y, 30, 30);
        }
    } else if(input=="purple") { //fills in purple petals
        noStroke();
        fill(112, 41, 99); //purple
        for(let i = 0; i < lastNum; i++){
            let angle = (TWO_PI/lastNum)*i;
            let x = windowWidth/2 + cos(angle)*flowerSize;
            let y = windowHeight/2 + sin(angle)*flowerSize;
            ellipse(x, y, 30, 30);
        }
    } else if(input=="bigger" || input=="grow") {
    //note to self: probably keep the sizes at the bottom as code works from top down, so you can adjust all the flowers
        flowerSize +=20 //adds 20px to size
    } else if(input=="smaller" || input=="shrink") {
        flowerSize -=20 //decreases 20px to size
    } else if(input=="stem") { //generates the stem
        stroke(79, 121, 66); //green
        strokeWeight(stemSize);
        line(windowWidth/2, windowHeight, windowWidth/2, windowHeight/2); //draws the stem from the middle bottom of the screen to the center of the flower
    } else if(input=="thicker") {
        stemSize += 2; //makes the stem 2px thicker
    } else if(input=="thinner") {
        stemSize -= 2; //makes the stem 2px thinner
<<<<<<< HEAD
    } else if(input=="background") {
        background(0, 0, random(0, 255)); //random shade of sky background
    } else if(input=="finish" || input=="finished" || input=="end") {

    }
}

function mousePressed() {

}

function mouseDragged() { //built-in functions to move the flower after it is completed

}

function mouseReleased() { //built-in functions to move the flower after it is completed

}

//elements to add: spikes, vines, leaves, background designs, music?
=======
    }
}

//elements to add: spikes, vines, leaves, background color?, music?
>>>>>>> 05ec70bd1238a49ea6712e38a7b9e4ae33d8c79a

//NOTE TO SELF: CAN REFERENCE PREVIOUS SKETCH PETAL DESIGN
//in the end maybe have a wiggling/shaking/flowing design when pressed or hover 
//in the end to restart, have the wind blow all the flowers away?

//should i change to type generate so things can generate in sequence?

/* 
//play with this later, similar format to circular petal design

    else if(input.includes("points"){ //points in a generated petal to have different shapes
        noFill();
        stroke(0);
        strokeWeight(3);
        
        let num = 0;
        let numWords = {"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9}; 
<<<<<<< HEAD

        for(let word in numWords){ 
            if(input.includes(word)) num = numWords[word]; 
        }        
        if(num == 0) { 
        }

        for(let i = 0; i < num; i++){ 
            let angle = (TWO_PI/num)*i; 
            let x = windowWidth/2 + cos(angle)*size;
            let y = windowHeight/2 + sin(angle)*size;
            ellipse(x, y); //
=======
        //had to do this manually since using parseInt to convert speech to numbers was not efficient

        for(let word in numWords){ //apparently needs seperate code for numbers above 10 as they no longer detect as words
            if(input.includes(word)) num = numWords[word]; //if the words detected as numbers, it translates automatically
        }        
        if(num == 0) { //catches any of the numbers that are not words, so that it does not become 0 and if it doesn't detect then it's counted as 0
            num = parseInt(input) || 0;
        }

        for(let i = 0; i < num; i++){ //draws out amount of petals
            let angle = (TWO_PI/num)*i; //spreads out evenly full circle depending on the amount 
            let x = windowWidth/2 + cos(angle)*size; //the *40 is the amount of pixels from the center
            let y = windowHeight/2 + sin(angle)*size;
            ellipse(x, y);
>>>>>>> 05ec70bd1238a49ea6712e38a7b9e4ae33d8c79a
        }

*/ 