
function screenShot() {
    // Copy the current canvas state into an image object
    let canvasSnapshot = get();
    // Save the snapshot to the history array
    canvasHistory.push(canvasSnapshot);
}

function createAnimation() {
    // STEP 1: POINTS GENERATION //
    drawPoints(points, true);
    screenShot();

    // STEP 2: POINTS SORTING //
    background(0);
    points = sortPoints(points);        
    drawPoints(points, true);
    screenShot();

    // STEP 3: FIRST POINT //
    let firstPoint = points[0];
    firstPoint.color = colors.RED; // First point in red
    drawPoint(firstPoint);
    drawCircle(firstPoint);    
    screenShot();

    // STEP 4: LAST POINT //
    let lastPoint = points[points.length - 1];
    lastPoint.color = colors.RED; // Last point in red
    drawPoint(lastPoint);
    drawCircle(lastPoint);        
    screenShot();

    // STEP 5: FIRST LINE //
    background(0);
    drawPoints(points);
    drawLine(firstPoint, lastPoint);
    screenShot();

    // STEP 6: LEFT POINTS //
    let leftPoints = points.slice(1, points.length - 1);
    background(0);
    drawPoints(points);
    drawLine(firstPoint, lastPoint);
    drawPoints(leftPoints);
    screenShot();
}
