const canvas = document.getElementById("preview");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");

var img = new Image();

img.src = "/assets/local/ampm/jpg/mitt_circle";
img.width = window.innerWidth * 0.25;
img.height = img.width;

const ww = window.innerWidth;
const wh = window.innerHeight;

const w = ww * 0.4;
const h = ww * 0.4;

canvas.width = w;
canvas.height = h;

img.addEventListener("load", (e) => {
    ctx.drawImage(img, 0, 0, w, h);
    update();
});

var number = document.getElementById("number");
var color = document.getElementById("name");
let fontSizeBox = document.getElementById("font-size");

var textData = {
    nx: 0,
    ny: 0,
    cx: 0,
    cy: 0,
    fs: 0,
    nt: "",
    ct: {
        line1: "",
        line2: "",
    },
};

document.getElementById("save").addEventListener("click", generateSaveImage)

fontSizeBox.addEventListener("change", update);

document.addEventListener("keyup", update)

function devideTextAtSpace(text) {
    //find the center of the text
    let center = text.length / 2;
    let left = text.substring(0, center);
    let right = text.substring(center);

    //find the last space in the left string
    let leftSpace = left.lastIndexOf(" ");
    let rightSpace = right.indexOf(" ");

    //find the closest space to the center
    let leftDistance = center - leftSpace;
    let rightDistance = rightSpace - center;
    let distance = Math.min(leftDistance, rightDistance);

    //if the distance is 0, then the space is the center
    if (distance === 0) {
        return [left, right];
    }

    //if the distance is positive, then the space is on the left
    if (distance > 0) {
        return [left.substring(0, leftSpace), left.substring(leftSpace + 1) + right];
    }

    //if the distance is negative, then the space is on the right
    if (distance < 0) {
        return [left + right.substring(0, rightSpace), right.substring(rightSpace + 1)];
    }

    return [left, right];
}

function generateSaveImage() {
    //create a new image
    canvas.width = 2000;
    canvas.height = 2000;

    //draw the image
    ctx.clearRect(0, 0, 2000, 2000);
    ctx.drawImage(img, 0, 0, 2000, 2000);

    //draw the text
    ctx.font = `${textData.fs * 4}px tech`;
    ctx.fillText(textData.nt, textData.cx * 4, textData.cy * 4);
    ctx.fillText(textData.ct.line1, textData.nx * 4, textData.ny * 4);
    ctx.fillText(textData.ct.line2, textData.nx2 * 4, textData.ny2 * 4);

    console.log(textData);

    //Download the image
    var link = document.getElementById("link");
    link.setAttribute("download", `${color.value}_${number.value}.png`);
    link.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();

    //reset the canvas
    canvas.width = 500;
    canvas.height = 500;

    number.value = "";
    color.value = "";

    update();
}

function update() {
    //Clear
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    //Update text
    const nameText = color.value;
    const numberValue = "#" + number.value;

    ctx.fillStyle = "#000";

    var fontSize = 64;
    ctx.font = `${fontSize}px 'tech'`;

    const circleWidth = w * 0.35;
    var nameWidth = ctx.measureText(nameText).width;
    var colorWidth = ctx.measureText(numberValue).width;

    const circleData = {
        x: w * 0.485,
        y: h * 0.45,
        r: circleWidth * 0.52,
    };

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(circleData.x, circleData.y, circleData.r, 0, 2 * Math.PI);
    ctx.stroke();

    let multiLine = false;

    let lineText = {
        line1: "",
        line2: "",
    };

    let lineWidth = {
        line1: 0,
        line2: 0,
    };



    if (nameText.includes(" ")) {
        multiLine = true;
        let textArray = devideTextAtSpace(nameText);
        lineText.line1 = textArray[0];
        lineText.line2 = textArray[1];
    } else {
        lineText.line1 = nameText;
    }

    lineWidth.line1 = ctx.measureText(lineText.line1).width;
    lineWidth.line2 = ctx.measureText(lineText.line2).width;

    const largestLine = Math.max(lineWidth.line1, lineWidth.line2);

    while (largestLine > circleWidth * 0.9) {
        fontSize = fontSize - 1;
        ctx.font = `${fontSize}px tech`;
        nameWidth = ctx.measureText(nameText).width;
    }

    fontSizeBox.value = fontSize;

    const nx = w / 2 - lineWidth.line1 / 2 - 10;
    const ny = multiLine ? h * 0.45 : h * 0.47;

    let nx2 = multiLine ? w / 2 - lineWidth.line2 / 2 - 10 : 0;
    let ny2 = multiLine ? h * 0.55 : 0;

    ctx.fillText(lineText.line1, nx, ny);
    ctx.fillText(lineText.line2, nx2, ny2);

    colorWidth = ctx.measureText(numberValue).width;

    const cx = w / 2 - colorWidth / 2 - 10;
    const cy = multiLine ? h * 0.65 : h * 0.55;

    ctx.fillText(numberValue, cx, cy);

    textData = {
        nx: nx,
        ny: ny,
        nx2: nx2,
        ny2: ny2,
        cx: cx,
        cy: cy,
        fs: fontSize,
        nt: numberValue,
        ct: lineText,
    };
}