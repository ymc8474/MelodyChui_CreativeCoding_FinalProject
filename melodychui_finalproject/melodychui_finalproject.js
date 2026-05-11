//Class: Creative Coding 
//Idea: Voice Activated Flowers
//By: Melody Chui

// --- REFERENCE LINKS ---
//voice drawing reference: https://editor.p5js.org/Tiri/sketches/cAGGZxMTR

// --- NOTES ---
//14" MacbookPro Window Width: 1512px
//14" MacbookPro Window Height: 982px
//In order to make it work on Open Processing, I think the sound library needs to be added to the index

// MAJOR UPDATE: I AM REWRITING WHAT I HAD FROM THE FINAL PRESENTATION, BUT TAKING CERTAIN ELEMENTS AND ADDING THEM BACK IN, BUT AFTER EXPERIMENTING FOR A WHILE WITH A LOT OF FRUSTRATION, STARTING OVER FROM A BASIC TEMPLATE SHOULD WORK THE BEST TO IMPLEMENT MY NEW IDEAS/CONCEPTS AFTER RECIEVING NOTES FROM THE FEEDBACK SESSION

let recording = new p5.SpeechRec(); //creates a new speech recognition object
recording.onResult = detection; //whenever sound is detected, the words are trying to be identified
recording.start(true,true); //starts listening

let showStem = false; //default does not show any stems on screen

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255); //white (not in draw loop so it does not cover the drawing on each new added frame)
    generateStems(); //this needs to be here or else it won't work but essentially premakes the stems
}

function draw() {
    background(255); //white; redraws/refreshes after every update
    if (showStem == true) { //if stems are being called, show them
        createStems();
        createFlowers(); //continutes to update flowers as well so they don't dissapear after every update
    }
}

function detection() {
    let input=recording.resultString.toLowerCase(); //makes detection lowercase so when detecting the words case by case, it is the same
    console.log(input); //for personal reference to see whether it is detecting the right words

    //sometimes with the floor() it seems to overwrite some existing flowers
    if (input == "stem" || input == "stems") {
        showStem = true; //activates the visibility of the stems when called
    } else if (input == "lily") {
        let i = floor(random(stems.length)); //chooses a random stem to place the flower on
        stems[i].flower = "lily"; //saves the flower into the array, showing that the certain stem is taken as it already has a flower on it
    } else if (input == "sunflower") { //same thing as lily but for sunflower
        let i = floor(random(stems.length));
        stems[i].flower = "sunflower";
    } else if (input == "rose") { //repeat for rose
        let i = floor(random(stems.length));
        stems[i].flower = "rose";
    } else if (input == "lavender") { //repeat for lavendar
        let i = floor(random(stems.length));
        stems[i].flower = "lavender";
    }
}

function generateStems() {
    stems = []; //holds the stem objects
    let sectionWidth = width/10; //creates 10 random stems
    for (let i=0; i<10; i++) { //loops 10 times to generate 10 different stems 
        let x = sectionWidth*i + random(sectionWidth*0.2, sectionWidth*0.8); //makes sure they are within a certain distant apart from each other so the stems don't clash
        let h = random(140, 260); //random height of the stems
        let w = random(4, 6); //random thickness of the stems
        let g = random(1, 255); //random green color
        stems.push({ 
            x: x, //the stems are laid out horizontally across the screen
            y: height, //makes sure it starts from the bottom of the canvas
            h: h,
            w: w,
            g: g
        });
    }
}

function createStems() {
    for (let s of stems) { //generation of all the stems
        stroke(0, s.g, 0);
        strokeWeight(s.w);
        line(s.x, s.y, s.x, s.y - s.h); //the s.y-s.h means that when drawing the line, they are moving upwards on the screen instead of downwards (which is offscreen)
    }
}

function createFlowers() {
    for (let s of stems) {
        if (s.flower == "lily") { //if a lily is saved into the array, it appears
            createLily(s.x+10, s.y-s.h); //draws the lily at the top of the stem and makes sure its centered with the +10
        }
        if (s.flower == "sunflower") { //cannot be else if or else it can be overwritten by the lily
            createSunflower(s.x, s.y - s.h); //same concept for lily but for sunflower
        }
        if (s.flower == "rose") { //repeat for rose
            createRose(s.x, s.y - s.h);
        }
        if (s.flower == "lavender") { //repeat for lavendar
            createLavender(s.x, s.y - s.h);
        }
    }
}

function createLily(x, y) { //coordinates of the chosen stem's top x and y point position
    noStroke();
    fill(240, 240, 240); //light grey
    arc(x-10, y, 52, 80, 0, PI); //underlying arch of the lily
    //note: the numbers above and below of the positioning were made tested trial and error

    fill(211, 211, 211); //semi-light grey
    bezier(x-35, y, x+35, y-50, x+35, y+50, x-35, y); //top part of the lily

    fill(255, 240, 150); //light yellow
    ellipse(x, y-15, 12, 25); //lily's center point                       
}

function createSunflower(x, y) {
    noStroke();
    fill(235, 206, 4); //sunflower yellow
    for (let i=0; i<14; i++) { //14 petals
        let angle = (TWO_PI/14)*i; //the petals wrap around the center in a circle
        push(); //starts the drawing position
            translate(x, y); //makes sure the petals are being attached to the center
            rotate(angle); //rotation from the previous petal
            bezier(0, 0, 70, -25, 70, 25, 0, 0); //petal
        pop(); //ends and saves the drawing position of the petal
    }
    noStroke();
    fill(101, 67, 33); //brown center
    ellipse(x, y, 25, 25); //center of sunflower
}

function createRose(x, y) {
    noStroke();
    fill(255, 20, 20); //red
    arc(x, y, 70, 60, 0, PI); //bottom of the rose part

    stroke(0); //black
    strokeWeight(1); //lines/rings
    ellipse(x, y, 70, 35); //biggest ring
    ellipse(x, y, 50, 25); //middle ring
    ellipse(x, y, 30, 15); //smallest ring
}

function createLavender(x, y) {
    noStroke();
    fill(150, 100, 200); //purple
    ellipse(x, y, 30, 30); //bottom bulb
    ellipse(x, y - 28, 30, 30);
    ellipse(x, y - 56, 30, 30); //center bulb
    ellipse(x, y - 84, 30, 30);
    ellipse(x, y - 112, 30, 30); //top bulb
}

/*
// --- OLD CODE (BEFORE FEEDBACK) ---
let flowerSize = 40; //to allow the flower to grow bigger or smaller (default is 40px from semester as that is the radius)
let stemSize = 5; //adjust the thickness of stem (default 5px)
let bgCol= [255, 255, 255]; //default white backround, and this variables allows adjustments for the background color
let flowerNum = 0; //saves the number of flower petals and adjusts to change the color for each when updating
let flowerCol = [0, 0, 0]; //easier format to update the flower colors as it reprints the flower design each time
let showStem = false; // turns off the stem when not being called
let showCenter = false; //similar function as showStem but for the flower center
let xPos; //locates current x position of flower center
let yPos; //locates current y position of flower center
let movement = false; //tracks whether the flower is currently moving/being dragged
let centerSize = 40; //determines the distance from center, for detecting where the mouse can control movement
let stemHeight = 1000; //the length of the stem (stretching beyond the borders so when you move left or right it still stays attached to the bottom)

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255); //white (not in draw loop so it does not cover the drawing on each new added frame)

    xPos = windowWidth/2;  
    yPos = windowHeight/2;   
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
        bgCol = [0, 0, random(0, 255)];
        flowerUpdate(); //random shade of sky background
    } 
    
    // --- END SECTION ---
    else if(input=="finish" || input=="finished" || input=="end") {

    }
}

function flowerUpdate() { //in order to properly change colors and sizes of things, this is needed to reupdate/draw the image at that moment
//I don't know why but this whole section took a long to figure out because I didn't want to keep "rewashing" the screen with the same image but iterated, but after testing so so so many methods, this is the only one that actually seems to work
    background(bgCol[0], bgCol[1], bgCol[2]); //changes to the currently saved background, while wiping away the screen and redrawing the new design on top

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
    background(bgCol[0], bgCol[1], bgCol[2]); //changes to the currently saved background, while wiping away the screen and redrawing the new design on top

    // --- DEFAULT FLOWER CENTER ---
    //redraws this section after the whole screen is "replaced/updated"
    if(centerVisible == true) { //simliar to how showStem works
        noStroke();
        fill(139, 128, 0); //yellow
        ellipse(xPos, yPos, flowerSize); //the center can grow with the flowers
    }
   
    // --- DEFAULT STEM ---
    if(showStem == true) { //this is used so that the stem is not shown before stem is called
        stroke(79, 121, 66); //green
        strokeWeight(stemSize);
        line(xPos, yPos + centerSize/2 + 10, xPos, yPos + centerSize/2 + stemHeight + 10); 
    }

    // --- FLOWER PETAL ADJUSTMENTS ---
    // this works by constantly reupdating/drawing the new screens
    noStroke();    
    fill(flowerCol[0], flowerCol[1], flowerCol[2]); //updates the constant color values 
    for (let i=0; i<flowerNum; i++) { //for every petal, it loops to adjust the color, shape, and size
        let angle = (TWO_PI/flowerNum)*i;
        let x = xPos + cos(angle) * flowerSize;
        let y = yPos + sin(angle) * flowerSize;
        ellipse(x, y, flowerSize, flowerSize); //changed to be not hardcoded values or else the petals won't grow/shrink
    }
}

function stemUpdate() { //this is the alternative tested way to make a stem that can grow and shrink properly
    stroke(79, 121, 66); //green
    strokeWeight(stemSize);
    line(windowWidth/2, windowHeight, windowWidth/2, windowHeight/2); //draws the stem from the middle bottom of the screen to the center of the flower
}

function mousePressed() {
    if(dist(mouseX, mouseY, xPos, yPos) < centerSize/2) { //checks the distance around the radius of the center of the flower, if it is nearby enough, allow movement with the mouse
        movement = true;
    }
}

function mouseDragged() { //built-in functions to drag/move the flower
    if(movement == true) { //if movement is activated (mouse is being pressed)
        xPos = mouseX; //keep updating the current center position to x position of mouse location
        yPos = mouseY; //keep updating the current center position to x position of mouse location
        flowerUpdate(); //keeps updating the screen to track the movement of the flower
    }
}

function mouseReleased() { //built-in functions to move the flower after it is completed
    movement = false; //stops all movement
}
*/ 