let myCanvas; // Declare a variable to hold the canvas
let canvasWidth = 400; // Initial canvas width
let canvasHeight = 400; // Initial canvas
document.getElementById('canvas').style.width = canvasWidth + 'px';
document.getElementById('canvas').style.height = canvasHeight + 'px';

function setup() {
    // Specify the parent container for the canvas using the parent() function
    myCanvas = createCanvas(canvasWidth, canvasHeight).parent('canvas');
}

function draw() {
    background(0); // Set the background color

    // Draw an ellipse at the center of the canvas
    ellipse(canvasWidth / 2, canvasHeight / 2, 50, 50);
}