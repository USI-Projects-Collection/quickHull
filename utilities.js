
// enumerator for colors
const colors = {
    RED : [255, 0, 0],
    GREEN : [0, 255, 0],
    BLUE : [0, 0, 255],
    YELLOW : [255, 255, 0],
    MAGENTA : [255, 0, 255],
    CYAN : [0, 255, 255],
    WHITE : [255, 255, 255],
    GREY : [128, 128, 128],
}

// enumerator of keys
const keys = {
    LEFT : 37,
    RIGHT : 39,
    SPACE : 32,
    M : 77,
    S : 83,
    ZERO : 48,
    NINE : 57,
}

// enumerator for side direction
const side = {
    LEFT : 1,
    COLLINEAR : 0,
    RIGHT : -1,
}

// Function to generate an array of white points
function generateSetOfPoints(n) {
    let points = [];
    for (let i = 0; i < n; i++) {
        let x = random(50, width - 50);
        let y = random(50, height - 50);
        newPoint = createVector(x, y);
        newPoint.color = colors.WHITE;
        newPoint.circle = true;
        points.push(newPoint);
    }
    return points;
}

// Function to draw a point with its color
function drawPoint(_point, scrSh=false) {
    stroke(_point.color);
    strokeWeight(4);
    point(_point);
    drawCircle(_point);
    if (scrSh) screenShot();
}

// Function to draw an array of points
function drawPoints(points, scrSh = false, numbers = false) {
    for (let i = 0; i < points.length; i++) {
        if (numbers) {

            // Draw the label
            fill(255);
            noStroke();
            textSize(12);
            textAlign(CENTER, BOTTOM);
            text(i + 1, points[i].x, points[i].y - 8); // Adjust the value -8 to position the label relative to the point
        }
        drawPoint(points[i], scrSh);
    }
}

function drawCircle(_point) {
    if (_point.circle && _point.color !== colors.WHITE) {
        _point.circle = false;
        noFill();
        stroke(_point.color);
        strokeWeight(2);
        ellipse(_point.x, _point.y, 15, 15); // Draw a circle around the first point
    }
}

function drawLine(_point1, _point2, color = colors.GREEN, scrSh = false) {
    stroke(color);
    strokeWeight(2);
    line(_point1.x, _point1.y, _point2.x, _point2.y);
    if (scrSh) screenShot();
}

// Function to sort points by x-coordinate
function sortPoints(points) {
    points.sort(function(a, b) {
        return a.x - b.x;
    });
    return points;
}

function orient(_point1, _point2, _point3, scrSh = false) {
    // Calculate the determinant
    let determinant = (_point2.x - _point1.x) * (_point3.y - _point1.y) - (_point3.x - _point1.x) * (_point2.y - _point1.y);
    // Return the sign of the side direction
    return determinant > 0 ? side.LEFT : determinant < 0 ? side.RIGHT : side.COLLINEAR;
}

function distance(_point1, _point2) {
    return Math.sqrt(Math.pow(_point2.x - _point1.x, 2) + Math.pow(_point2.y - _point1.y, 2));
}

function lineDist(_point1, _point2, _point3) {
    return Math.abs((_point2.y - _point1.y) * _point3.x - (_point2.x - _point1.x) * _point3.y + _point2.x * _point1.y - _point2.y * _point1.x) / distance(_point1, _point2);
}

function changeColor(_point, color) {
    _point.color = color;
    _point.circle = true;
    drawPoint(_point);
    if (microSteps) screenShot();
}

function changeColors(points, color) {
    for (let i = 0; i < points.length; i++) {
        changeColor(points[i], color);
    }
}