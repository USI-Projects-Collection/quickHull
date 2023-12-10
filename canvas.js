
let myCanvas; // Declare a variable to hold the canvas
let canvasWidth = 600; // Initial canvas width
let canvasHeight = 800; // Initial canvas height
let animationStep = 0; // Variable to control the animation state
let canvasHistory = []; // Array to hold the canvas snapshots

let nPoints = 10; // Number of points
let points; // Array to hold the set of points

function setup() {
    // Specify the parent container for the canvas using the parent() function
    myCanvas = createCanvas(canvasWidth, canvasHeight).parent('canvas');
    // Generate the set of points once in the setup
    points = generateSetOfPoints(nPoints);
    // clear the canvas history
    canvasHistory = [];
    // Create the animation
    createAnimation();
}

function draw() {
    // Clear the canvas
    clear();
    // Draw each snapshot from the history array
    image(canvasHistory[animationStep], 0, 0);
}

// function to control the animation state
function keyPressed() {
    if (keyCode === keys.RIGHT) {
        if (animationStep < canvasHistory.length - 1) {
            animationStep++; // Move to the next point
        }
    } else if (keyCode === keys.LEFT && animationStep > 0) {
        if (animationStep > 0) {
            animationStep--; // Move to the previous point
        }
    } else if (keyCode === keys.SPACE) {
        setup(); // Reset the animation
    }
}
