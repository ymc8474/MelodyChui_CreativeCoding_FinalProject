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
let bgCol = [0, 0, 0]; //adjusts the background color
let flowerNum = 0; //saves the number of flower petals and adjusts to change the color for each when updating
let flowerCol = [0, 0, 0]; //easier format to update the flower colors as it reprints the flower design each time
let showStem = false; // turns off the stem when not being called
let showCenter = false; //similar function as showStem but for the flower center

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255); //white (not in draw loop so it does not cover the drawing on each new added frame)
}

function draw() {
    
}

function detection() {
    let input=recording.resultString.toLowerCase();
    console.log(input); //for personal reference to see whether it is detecting the right words

    // --- START SECTION / FLOWER CENTER ---
    if(input=="start"){
        centerVisible = true; //only shows when being called
        noStroke();
        fill(139, 128, 0); //yellow
        ellipse(windowWidth/2, windowHeight/2, 40) //starting flower center
    } 
    
    // --- PETALS + NUMBERING SECTION ---
    else if(input.includes("petals") || input.includes("pedals")){ //oftentime misoverheard so alternative detection
    //default: round/circlular petal design
        let num = 0;
        let numWords = {"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9}; 
        //had to do this manually since using parseInt to convert speech to numbers was not efficient

        for(let word in numWords){ //apparently needs seperate code for numbers above 10 as they no longer detect as words
            if(input.includes(word)) num = numWords[word]; //if the words detected as numbers, it translates automatically
        }        
        if(num == 0) { //catches any of the numbers that are not words, so that it does not become 0 and if it doesn't detect then it's counted as 0
            num = parseInt(input) || 0;
        }
        flowerNum = num; //saves the amount of petals before the array counting is rewritten
        flowerUpdate();

        for(let i=0; i<num; i++){ //draws out amount of petals
            let angle = (TWO_PI/num)*i; //spreads out evenly full circle depending on the amount 
            let x = windowWidth/2 + cos(angle)*flowerSize; //the *40 is the amount of pixels from the center
            let y = windowHeight/2 + sin(angle)*flowerSize;
            ellipse(x, y, 30, 30);
        }
    } 
    
    // --- CHANGING FLOWER COLOR SECTION ---
    else if(input=="red") { //if the color red is assigned to the flower, it fills in all the petals accordingly
        flowerCol = [255, 22, 12]; //red
        flowerUpdate(); //updates entire screen with the new color filled flower petals
    } else if(input=="blue") {
        flowerCol = [0, 71, 171]; //blue
        flowerUpdate();
    } else if(input=="purple") {
        flowerCol = [112, 41, 99]; //purple
        flowerUpdate();
    }
    
    // --- FLOWER GROWTH/SHRINKAGE SECTION ---
    else if(input=="bigger" || input=="grow") {
    //note to self: probably keep the sizes at the bottom as code works from top down, so you can adjust all the flowers
        flowerSize +=20 //adds 20px to size
        flowerUpdate(); 
    } else if(input=="smaller" || input=="shrink") {
        flowerSize -=20 //decreases 20px to size
        flowerUpdate();
    } 
    
    // --- STEM SECTION ---
    else if(input=="stem") { //generates the stem
        showStem = true; //activates to show stem when it is called, and not just with the flowerUpdate()
        flowerUpdate(); //needs to update the screen
    } else if(input=="thicker") {
        stemSize += 2; //makes the stem 2px thicker
        stemUpdate(); //updates the stemUpdate() function which allows stem to change thicknesses
        flowerUpdate(); //updates the whole screen with new changes
    } else if(input=="thinner") {
        stemSize -= 2; //makes the stem 2px thinner
        stemUpdate();
        flowerUpdate();
    } 
    
    // --- BACKRGROUND SECTION ---
    else if(input=="background") {
        bgColor = [0, 0, random(0, 255)];
        flowerUpdate(); //random shade of sky background
    } 
    
    // --- END SECTION ---
    else if(input=="finish" || input=="finished" || input=="end") {

    }
}

function flowerUpdate() { //in order to properly change colors and sizes of things, this is needed to reupdate/draw the image at that moment
//I don't know why but this whole section took a long to figure out because I didn't want to keep "rewashing" the screen with the same image but iterated, but after testing so so so many methods, this is the only one that actually seems to work
    background(bgColor[0], bgColor[1], bgColor[2]); //changes to the currently saved background, while wiping away the screen and redrawing the new design on top

    // --- DEFAULT FLOWER CENTER ---
    //redraws this section after the whole screen is "replaced/updated"
    if(centerVisible == true) { //simliar to how showStem works
        noStroke();
        fill(139, 128, 0); //yellow
        ellipse(windowWidth/2, windowHeight/2, flowerSize); //the center can grow with the flowers
    }
   
    // --- DEFAULT STEM ---
    if(showStem == true) { //this is used so that the stem is not shown before stem is called
        stroke(79, 121, 66); //green
        strokeWeight(stemSize);
        line(windowWidth/2, windowHeight, windowWidth/2, windowHeight/2 + flowerSize/2 + 10); //ading the +flowerSize/2 + 10 make it so that the stem is not covering the petals and center and is a little bit detached so that when it grows it does not show on the center
    }

    // --- FLOWER PETAL ADJUSTMENTS ---
    // this works by constantly reupdating/drawing the new screens
    noStroke();    
    fill(flowerCol[0], flowerCol[1], flowerCol[2]); //updates the constant color values 
    for (let i=0; i<flowerNum; i++) { //for every petal, it loops to adjust the color, shape, and size
        let angle = (TWO_PI/flowerNum)*i;
        let x = windowWidth/2 + cos(angle) * flowerSize;
        let y = windowHeight/2 + sin(angle) * flowerSize;
        ellipse(x, y, flowerSize, flowerSize); //changed to be not hardcoded values or else the petals won't grow/shrink
    }
}

function stemUpdate() { //this is the alternative tested way to make a stem that can grow and shrink properly
    stroke(79, 121, 66); //green
    strokeWeight(stemSize);
    line(windowWidth/2, windowHeight, windowWidth/2, windowHeight/2); //draws the stem from the middle bottom of the screen to the center of the flower
}

function flowerUpdate() { //in order to properly change colors and sizes of things, this is needed to reupdate/draw the image at that moment
//I don't know why but this whole section took a long to figure out because I didn't want to keep "rewashing" the screen with the same image but iterated, but after testing so so so many methods, this is the only one that actually seems to work
    background(bgColor[0], bgColor[1], bgColor[2]); //changes to the currently saved background, while wiping away the screen and redrawing the new design on top

    // --- DEFAULT FLOWER CENTER ---
    //redraws this section after the whole screen is "replaced/updated"
    if(centerVisible == true) { //simliar to how showStem works
        noStroke();
        fill(139, 128, 0); //yellow
        ellipse(windowWidth/2, windowHeight/2, flowerSize); //the center can grow with the flowers
    }
   
    // --- DEFAULT STEM ---
    if(showStem == true) { //this is used so that the stem is not shown before stem is called
        stroke(79, 121, 66); //green
        strokeWeight(stemSize);
        line(windowWidth/2, windowHeight, windowWidth/2, windowHeight/2 + flowerSize/2 + 10); //ading the +flowerSize/2 + 10 make it so that the stem is not covering the petals and center and is a little bit detached so that when it grows it does not show on the center
    }

    // --- FLOWER PETAL ADJUSTMENTS ---
    // this works by constantly reupdating/drawing the new screens
    noStroke();    
    fill(flowerCol[0], flowerCol[1], flowerCol[2]); //updates the constant color values 
    for (let i=0; i<flowerNum; i++) { //for every petal, it loops to adjust the color, shape, and size
        let angle = (TWO_PI/flowerNum)*i;
        let x = windowWidth/2 + cos(angle) * flowerSize;
        let y = windowHeight/2 + sin(angle) * flowerSize;
        ellipse(x, y, flowerSize, flowerSize); //changed to be not hardcoded values or else the petals won't grow/shrink
    }
}

function stemUpdate() { //this is the alternative tested way to make a stem that can grow and shrink properly
    stroke(79, 121, 66); //green
    strokeWeight(stemSize);
    line(windowWidth/2, windowHeight, windowWidth/2, windowHeight/2); //draws the stem from the middle bottom of the screen to the center of the flower
}

function mousePressed() {

}

function mouseDragged() { //built-in functions to move the flower after it is completed

}

function mouseReleased() { //built-in functions to move the flower after it is completed

}

//elements to add: spikes, vines, leaves, background color?, music?

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
        }

*/ 