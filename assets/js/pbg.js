/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", resizeCanvas, false);

let screenRatio = 16;
let xBlocks = Math.ceil(canvas.width / screenRatio);
let yBlocks = Math.ceil(canvas.height / screenRatio);
const imgList = [
    "stone",
    "coal_ore",
    "iron_ore",
    "redstone_ore",
    "lapis_ore",
    "gold_ore",
    "diamond_ore",
    "emerald_ore",
];

let frameCount = 0;
let yOffset = 0;

let blockGrid = [
    []
];

let oregen = {
    coal_ore: [
        [
            [0, 1, 0, 0],
            [1, 1, 1, 1],
            [0, 1, 1, 0],
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 1, 1, 1],
            [0, 0, 1, 1],
        ],
        [
            [0, 1, 1, 0],
            [0, 1, 1, 1],
            [0, 0, 1, 1],
            [1, 1, 1, 0],
        ],
        [
            [1, 1, 1, 1],
            [1, 0, 1, 0],
        ],
    ],
    iron_ore: [
        [
            [1],
            [1],
            [1]
        ],
        [
            [1, 1, 1]
        ],
        [
            [0, 1],
            [1, 1],
        ],
        [
            [1, 1],
            [0, 1],
        ],
    ],
    gold_ore: [
        [
            [1, 1, 1],
            [1, 1, 1],
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
        ],
        [
            [1, 1, 1],
            [1, 1, 1],
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
        ],
    ],
    redstone_ore: [
        [
            [1, 0, 1, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 1, 0, 1, 1],
        ],
        [
            [1, 0, 1, 1],
            [0, 1, 1, 0],
            [1, 1, 0, 1],
        ],
        [
            [1, 1, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 1, 1],
        ],
        [
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 1, 1, 1],
        ],
    ],
    diamond_ore: [
        [
            [1, 1],
            [1, 1],
        ],
        [
            [1],
            [1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
        ],
    ],
    lapis_ore: [
        [
            [1, 0, 1, 0, 1],
            [0, 1, 1, 1, 0],
            [1, 1, 0, 1, 1],
        ],
        [
            [1, 0, 1, 1],
            [0, 1, 1, 0],
            [1, 1, 0, 1],
        ],
        [
            [1, 1, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 1, 1],
        ],
        [
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 1, 1, 1],
        ],
    ],
    emerald_ore: [
        [
            [1, 0],
            [0, 0]
        ]
    ],
};

const img = {
    stone: new Image(),
    coal_ore: new Image(),
    iron_ore: new Image(),
    redstone_ore: new Image(),
    lapis_ore: new Image(),
    gold_ore: new Image(),
    diamond_ore: new Image(),
    emerald_ore: new Image(),
};

Object.values(img).forEach((img) => {
    let imgName = imgList.shift();
    img.src = `assets/local/minecraft/png/${imgName}`;
    img.ariaLabel = imgName;
});

resizeCanvas();

setTimeout(generateBlockGrid(), 1000);

setInterval(render, 1000 / 30);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    xBlocks = Math.ceil(canvas.width / screenRatio);
    yBlocks = Math.ceil(canvas.height / screenRatio) + 5;
}

function render() {
    frameCount++;
    yOffset = screenRatio - (frameCount % screenRatio);

    if (frameCount % screenRatio === 0) {
        shiftBlockGrid();
        addRow();
        for (let i = 0; i < 3; i++) {
            generateFloorOre();
        }

    }

    for (let x = 0; x < xBlocks; x++) {
        for (let y = 0; y < yBlocks; y++) {
            drawBlock(x, y, blockGrid[x][y]);
        }
    }

    //dark filter
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBlock(x, y, img) {
    ctx.drawImage(img, x * screenRatio, (y - 1) * screenRatio + yOffset, screenRatio, screenRatio);
}

function setBlockGrid(x, y, img) {
    if (x < xBlocks && y < yBlocks && x >= 0 && y >= 0) {
        blockGrid[x][y] = img;
    }
}

function clearBlockGrid() {
    blockGrid = [];

    for (let x = 0; x < xBlocks; x++) {
        blockGrid[x] = [];
        for (let y = 0; y < yBlocks; y++) {
            blockGrid[x][y] = img.stone;
        }
    }
}

function shiftBlockGrid() {
    blockGrid.forEach((col) => {
        col.shift();
    })
}

function generateBlockGrid() {
    clearBlockGrid();

    for (let i = 0; i < 100; i++) {
        generateOreVein(Object.values(img)[Math.floor(Math.random() * Object.values(img).length)]);
    }
}

function addRow() {

    blockGrid.forEach((col) => {
        col.push(img.stone);
    });

}

function generateFloorOre() {

    let x = Math.floor(Math.random() * xBlocks);
    let y = yBlocks - 4;

    generateOreVein(Object.values(img)[Math.floor(Math.random() * Object.values(img).length)], x, y);

}

function generateOreVein(type, x = -1, y = -1) {
    if (type.ariaLabel == "stone") return;
    let startX = x == -1 ? Math.floor(Math.random() * xBlocks) : x;
    let startY = y == -1 ? Math.floor(Math.random() * yBlocks) : y;
    let ore = type.ariaLabel;
    let genOre = oregen[ore];
    let gen = genOre[Math.floor(Math.random() * genOre.length)];
    let genWidthX = gen[0].length - 1;
    let genWidthY = gen.length - 1;

    for (let x = 0; x < genWidthX; x++) {
        for (let y = 0; y < genWidthY; y++) {
            if (gen[y][x] == 1) {
                setBlockGrid(x + startX, y + startY, type);
            }
        }
    }

    console.log(`Generated ${ore} at ${startX}, ${startY}`);
}