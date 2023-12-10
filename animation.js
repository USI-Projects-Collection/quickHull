
let nPoints = 10; // Number of points

// hull is an array to store the result (points of convex hull)
let hull = [];


function screenShot() {
    // Copy the current canvas state into an image object
    let canvasSnapshot = get();
    // Save the snapshot to the history array
    canvasHistory.push(canvasSnapshot);
}

function createAnimation(points) {
    // STEP 1: POINTS GENERATION //
    drawPoints(points, microSteps, true);
    screenShot();

    // STEP 2: POINTS SORTING //
    background(0);
    points = sortPoints(points);
    drawPoints(points, false, true);
    screenShot();

    // STEP 3: FIRST POINT //
    let firstPoint = points[0];
    changeColor(firstPoint, colors.RED);
    hull.push(firstPoint); // Add the first point to the convex hull
    drawPoint(firstPoint);
    screenShot();

    // STEP 4: LAST POINT //
    let lastPoint = points[points.length - 1];
    changeColor(lastPoint, colors.RED);
    hull.push(lastPoint); // Add the last point to the convex hull
    drawPoint(lastPoint);
    screenShot();

    // STEP 5: FIRST LINE //
    background(0);
    drawPoints(points);
    screenShot();
    drawLine(firstPoint, lastPoint);
    screenShot();

    // STEP 6: LEFT AND RIGHT POINTS //
    let leftPoints = [];
    let rightPoints = [];
    for (let i = 0; i < points.length; i++) {
        if (orient(firstPoint, lastPoint, points[i]) === side.LEFT) {
            drawLine(firstPoint, points[i], colors.MAGENTA);
            changeColor(points[i], colors.MAGENTA, microSteps);
            leftPoints.push(points[i]);
        } else if (orient(firstPoint, lastPoint, points[i]) === side.RIGHT) {
            drawLine(firstPoint, points[i], colors.CYAN);
            changeColor(points[i], colors.CYAN, microSteps);
            rightPoints.push(points[i]);
        }
    }
    screenShot();
    quickHull(leftPoints, firstPoint, lastPoint, side.LEFT);
    quickHull(rightPoints, lastPoint, firstPoint, side.RIGHT);
    background(0);
    drawPoints(points);

    screenShot();
}


// End points of line L are p1 and p2. side can have value
// 1 or -1 specifying each of the parts made by the line L
function quickHull(a, p1, p2, side) {
    let ind = -1;
    let max_dist = 0;

    // finding the point with maximum distance
    // from L and also on the specified side of L.
    for (let i = 0; i < a.length; i++) {
        const temp = lineDist(p1, p2, a[i]);
        if (orient(p1, p2, a[i]) === side && temp > max_dist) {
            ind = i;
            max_dist = temp;
        }
    }

    // If no point is found, add the end points
    // of L to the convex hull.
    if (ind === -1) {
        hull.push(p1);
        hull.push(p2);
        return;
    }

    

    // Recur for the two parts divided by a[ind]
    quickHull(a, a[ind], p1, -orient(a[ind], p1, p2));
    quickHull(a, a[ind], p2, -orient(a[ind], p2, p1));
}