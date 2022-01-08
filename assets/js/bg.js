/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById("canvas");

window.addEventListener("resize", resizeCanvas, false);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = generatePoints(100);

let globalRadius = 0;

let debugKeyPressed = false;

resizeCanvas();

//Get mouse movement speed

let mouseDown = false;

let mouse = {
    x: 0,
    y: 0,
};

let lastMouse = {
    x: 0,
    y: 0,
};

let mouseAccel = {
    x: 0,
    y: 0,
};

let lastMouseAccel = {
    x: 0,
    y: 0,
};

let globalAccel = {
    x: 0,
    y: 0,
};

//detect if control is pressed
window.addEventListener("keydown", (e) => {
    if (e.key == "Control") {
        debugKeyPressed = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "Control") {
        debugKeyPressed = false;
    }
});

canvas.addEventListener("mousemove", (e) => {
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    mouseDown = e.buttons.toString(2).charAt(0) == 1;

    if (mouseDown) {
        mouseAccel.x = (mouse.x - lastMouse.x) * 2;
        mouseAccel.y = (mouse.y - lastMouse.y) * 2;
    } else {
        mouseAccel.x = mouse.x - lastMouse.x;
        mouseAccel.y = mouse.y - lastMouse.y;
    }
});

setInterval(() => render(), 1000 / 45);
setInterval(() => checkMouseAccel(), 100);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    globalRadius = Math.round((canvas.width * canvas.height) / 10000);

    points = generatePoints(globalRadius);
}

function checkMouseAccel() {
    if (lastMouseAccel.x == mouseAccel.x && lastMouseAccel.y == mouseAccel.y) {
        mouseAccel.x = 0;
        mouseAccel.y = 0;
    }
    lastMouseAccel.x = mouseAccel.x;
    lastMouseAccel.y = mouseAccel.y;
}

function render() {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    processPoints();
    renderPoints(ctx);
    drawLines(ctx);

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";

    ctx.font = "30px Arial";

    ctx.fillText(debugKeyPressed ? `${calcDotsCurrentlyOnScreen()}/${globalRadius}` : "", 10, 30);
}

function generatePoints(n) {
    let points = [];
    for (let i = 0; i < n; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
        });
    }
    return points;
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function renderPoints(ctx) {
    points.forEach((point) => {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function processPoints() {
    globalAccel.x += mouseAccel.x / 200;
    globalAccel.y += mouseAccel.y / 200;

    //global mouse accel friction

    globalAccel.x *= 0.95;
    globalAccel.y *= 0.95;

    let radius = bound(Math.abs(globalAccel.x + globalAccel.y) * (globalRadius / 10), globalRadius / 3, globalRadius)

    points.forEach((point) => {
        if (point.x > canvas.width + radius) {
            point.x = 0;
        }

        if (point.x < 0 - radius) {
            point.x = canvas.width;
        }

        if (point.y > canvas.height + radius) {
            point.y = 0;
        }

        if (point.y < 0 - radius) {
            point.y = canvas.height;
        }

        point.vx += modify(globalAccel.x / 1000, 0.1)
        point.vy += modify(globalAccel.y / 1000, 0.1)

        point.vy = roughBound(point.vy, -1.5, 1.5);
        point.vx = roughBound(point.vx, -1.5, 1.5);

        point.x += point.vx + globalAccel.x;
        point.y += point.vy + globalAccel.y;
    });
}

function drawLines(ctx) {
    points.forEach((point) => {
        let pointsInRadius = getPointsInRadius(bound(Math.abs(globalAccel.x + globalAccel.y) * 15, 50, 150), points, point);
        pointsInRadius.forEach((point2) => {
            drawLine(ctx, point, point2);
        });
    });
}

function drawLine(ctx, point1, point2) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}

function getDistanceBeteenPoints(point1, point2) {
    let x = point1.x - point2.x;
    let y = point1.y - point2.y;
    return Math.sqrt(x * x + y * y);
}

function getDistanceFromMouse(point) {

    let x = point.x - mouse.x;
    let y = point.y - mouse.y;
    return Math.sqrt(x * x + y * y);
}

function getPointsInRadius(radius, points, point) {

    let pointsInRadius = [];

    points.forEach((point1) => {
        if (getDistanceBeteenPoints(point, point1) < radius) {
            pointsInRadius.push(point1);
        }
    });

    return pointsInRadius;

}

function bound(value, min, max) {
    return Math.max(Math.min(value, max), min);
}

function roughBound(value, min, max) {

    //if the value is within the min and max, return it

    if (value > min && value < max) {
        return value;
    }

    //if the value is below the min, change it relative to the distance from the min

    if (value < min) {
        return min - (min - value) / 2;
    }

    //if the value is above the max, change it relative to the distance from the max

    if (value > max) {
        return max + (value - max) / 2;
    }

}

function modify(value, modifier) {
    return value * (Math.random() * modifier);
}

function calcDotsCurrentlyOnScreen() {
    let dotsOnScreen = 0;
    points.forEach((point) => {
        if (point.x > 0 && point.x < canvas.width && point.y > 0 && point.y < canvas.height) {
            dotsOnScreen++;
        }
    });
    return dotsOnScreen;
}