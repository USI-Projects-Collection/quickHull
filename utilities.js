
// enumerator for colors
const colors = {
    RED : [255, 0, 0],
    GREEN : [0, 255, 0],
    BLUE : [0, 0, 255],
    YELLOW : [255, 255, 0],
    MAGENTA : [255, 0, 255],
    CYAN : [0, 255, 255],
    WHITE : [255, 255, 255],
}

// enumerator of keys
const keys = {
    LEFT : 37,
    RIGHT : 39,
    SPACE : 32,
}

// Function to generate an array of white points
function generateSetOfPoints(n) {
    let points = [];
    for (let i = 0; i < n; i++) {
        let x = random(50, width - 50);
        let y = random(50, height - 50);
        newPoint = createVector(x, y);
        newPoint.color = colors.WHITE;
        points.push(newPoint);
    }
    return points;
}

// Function to draw a point with its color
function drawPoint(_point) {
    stroke(_point.color);
    strokeWeight(4);
    point(_point);
}

// Function to draw an array of points
function drawPoints(points, numbers = false) {
    for (let i = 0; i < points.length; i++) {
        drawPoint(points[i]);
        
        if (numbers) {
            // Draw the label
            fill(255);
            noStroke();
            textSize(12);
            textAlign(CENTER, BOTTOM);
            text(i + 1, points[i].x, points[i].y - 8); // Adjust the value -8 to position the label relative to the point
        }
    }
}

function drawCircle(_point, color = colors.RED) {
    noFill();
    stroke(color);
    strokeWeight(2);
    ellipse(_point.x, _point.y, 15, 15); // Draw a circle around the first point
}

function drawLine(_point1, _point2, color = colors.RED) {
    stroke(color);
    strokeWeight(2);
    line(_point1.x, _point1.y, _point2.x, _point2.y);
}

// Function to sort points by x-coordinate
function sortPoints(points) {
    points.sort(function(a, b) {
        return a.x - b.x;
    });
    return points;
}