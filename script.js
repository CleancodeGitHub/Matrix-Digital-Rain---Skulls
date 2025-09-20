// Get the canvas and UI elements
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the entire window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- EMOJI SYMBOL SET ---
const symbols = ['💀', '🦴', '☠️'];
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

const rainDrops = [];
for (let i = 0; i < columns; i++) {
    rainDrops[i] = 1 + Math.floor(Math.random() * (canvas.height / fontSize));
}

// Mouse position tracker
const mouse = {
    x: null,
    y: null,
    radius: 100
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// The main animation function
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#BBB';
    ctx.font = fontSize + 'px monospace';
    ctx.shadowBlur = 0;

    for (let i = 0; i < rainDrops.length; i++) {
        const text = symbols[Math.floor(Math.random() * symbols.length)];
        const x_pos = i * fontSize;
        const y_pos = rainDrops[i] * fontSize;

        const dx = mouse.x - x_pos;
        const dy = mouse.y - y_pos;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            ctx.fillStyle = '#FFF';
            ctx.shadowColor = '#FFF';
            ctx.shadowBlur = 15;
            ctx.font = (fontSize + 2) + 'px monospace';
        } else {
            ctx.fillStyle = '#BBB';
            ctx.shadowBlur = 0;
            ctx.font = fontSize + 'px monospace';
        }

        ctx.fillText(text, x_pos, y_pos);

        if (y_pos > canvas.height && Math.random() > 0.98) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

// Start the animation loop
setInterval(draw, 33);

// Adjust canvas size if the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});