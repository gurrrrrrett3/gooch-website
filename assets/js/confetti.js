/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", resizeCanvas, false);

/**
 * @type {Array<Particle>}
 */
var particles = [];

/**
 * @type {Array<ParticleSpawner>}
 */
var spawners = [];

var globalRadius = 3;

var g = {
  xvm: 0.995,
  yvm: 0.1,
  sx: 7,
  sy: -15,
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  makeSpawners();
}

class Particle {
  x = 0;
  y = 0;
  xv = 0;
  yv = 0;
  color = "";

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xv = 0;
    this.yv = 0;
    this.color = generateRandomColor();
  }

  setVelocity(xv, yv) {
    this.xv = xv;
    this.yv = yv;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, globalRadius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.xv;
    this.y += this.yv;

    if (this.x < 0 || this.x > canvas.width) {
      this.xv *= -1;
    }

    if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
      //remove particle
      particles.splice(particles.indexOf(this), 1);
    }

    this.xv *= g.xvm;
    this.yv += g.yvm;
  }
}

class ConfettiSpawner {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  spawnParticle() {
    let particle = new Particle(this.x, this.y);

    particle.setVelocity((Math.random() - 0.5) * g.sx, Math.random() * g.sy);

    particles.push(particle);
  }
}

function generateRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 50%)";
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  //spawn confetti
  spawners.forEach((spawner) => {
    spawner.spawnParticle();
  });

  requestAnimationFrame(render);
}

function makeSpawners() {
  spawners = [];
  //load confetti spawners
  spawners.push(new ConfettiSpawner(canvas.width / 4, canvas.height - 10));
  spawners.push(new ConfettiSpawner(canvas.width / 2, canvas.height - 10));
  spawners.push(new ConfettiSpawner((canvas.width / 4) * 3, canvas.height - 10));
}

window.addEventListener("mousemove", (e) => {
    let p = new Particle(e.clientX, e.clientY)
    p.setVelocity((Math.random() - 0.5) * g.sx, Math.random() * g.sy / 4);
    particles.push(p);
    
})

resizeCanvas();
render();
