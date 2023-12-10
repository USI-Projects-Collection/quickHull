
let myCanvas; // Declare a variable to hold the canvas
let canvasWidth = 600; // Initial canvas width
let canvasHeight = 800; // Initial canvas height

let nPoints = 10; // Number of points
let unsortedPoints; // Array to hold the set of points
let points; // Array to hold the sorted white points

let animationStep; // The animation state index
let currentState; // The current animation state index
let endState = false; // Boolean to check if the animation is finished

function setup() {
    // Specify the parent container for the canvas using the parent() function
    myCanvas = createCanvas(canvasWidth, canvasHeight).parent('canvas');

    // the animation start displaing the set points
    animationStep = 1;

    // Generate the set of points once in the setup
    unsortedPoints = generateSetOfPoints(nPoints);

    // Sort the points by x-coordinate
    points = sortPoints([...unsortedPoints]);
}

function restore() {
    background(0); // Clear the canvas
    currentState = animationStep; // Save the current animation state
    document.getElementById('step').innerHTML = animationStep;
    for (let i = 0; i < points.length; i++) {
        points[i].color = colors.WHITE; // Reset the color of all points
    }
}

function draw() {
    restore();
    
    // STEP 1: POINTS GENERATION //
    if (animationStep) {
        drawPoints(unsortedPoints, true);
        animationStep -= 1; 
    }

    // STEP 2: POINTS SORTING //
    if (animationStep) {
        background(0);
        drawPoints(points, true);
        animationStep -= 1;
    }

    // STEP 3: FIRST POINT //
    let firstPoint = points[0];
    if (animationStep) {
        firstPoint.color = colors.RED; // First point in red
        drawPoint(firstPoint);
        drawCircle(firstPoint);    
        animationStep -= 1;
    }

    // STEP 4: LAST POINT //
    let lastPoint = points[points.length - 1];
    if (animationStep) {
        lastPoint.color = colors.RED; // Last point in red
        drawPoint(lastPoint);
        drawCircle(lastPoint);        
        animationStep -= 1;
    }

    // STEP 5: FIRST LINE //
    if (animationStep) {
        background(0);
        drawPoints(points);
        drawLine(firstPoint, lastPoint);
        animationStep -= 1;
    }

    // STEP 6: LEFT POINTS //
    let leftPoints = points.slice(1, points.length - 1);
    if (animationStep) {
        background(0);
        drawPoints(points);
        drawLine(firstPoint, lastPoint);
        drawPoints(leftPoints);
        animationStep -= 1;
    }
    

    animationStep = currentState; // Restore the current animation index
}

// function to control the animation state
function keyPressed() {
    if (keyCode === 39) { // Check if the key pressed is the spacebar
        animationStep++; // Move to the next point
    } else if (keyCode === 37 && animationStep > 0) {
        if (animationStep > 1) {
            animationStep--; // Move to the previous point
        }
    } else if (keyCode === 32) {
        setup(); // Reset the animation
    }
}