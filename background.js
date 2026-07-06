const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

// Canvas Resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Mouse Position
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

// Arrays
const trails = [];
const ripples = [];

// ===================== Trail ======================

class Trail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 80;
        this.alpha = 0.35;
    }

    update() {
        this.size += 2;
        this.alpha -= 0.008;
    }

    draw() {

        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size
        );

       gradient.addColorStop(0, `rgba(168,85,247,${this.alpha})`);
gradient.addColorStop(0.5, `rgba(139,92,246,${this.alpha * 0.6})`);
gradient.addColorStop(1, `rgba(15,23,42,0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===================== Ripple ======================

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.alpha = 0.4;
    }

    update() {
        this.radius += 3;
        this.alpha -= 0.01;
    }

    draw() {

        ctx.beginPath();
        ctx.strokeStyle = `rgba(168,85,247,${this.alpha})`;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
       ctx.strokeStyle = `rgba(139,92,246,${this.alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius + 18, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Mouse Move
window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    trails.push(new Trail(mouse.x, mouse.y));
    ripples.push(new Ripple(mouse.x, mouse.y));

});

// Animation
function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Trails
    for (let i = trails.length - 1; i >= 0; i--) {

        trails[i].update();
        trails[i].draw();

        if (trails[i].alpha <= 0) {
            trails.splice(i, 1);
        }
    }

    // Ripples
    for (let i = ripples.length - 1; i >= 0; i--) {

        ripples[i].update();
        ripples[i].draw();

        if (ripples[i].alpha <= 0) {
            ripples.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();