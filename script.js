const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let shapes = [];

// Creăm mai multe forme: cercuri, pătrate, triunghiuri
function createShapes() {
  for (let i = 0; i < 10; i++) {
    shapes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      size: 20 + Math.random() * 30,
      type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    });
  }
}

function drawShapes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shapes.forEach(shape => {
    ctx.fillStyle = shape.color;

    if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape.type === "square") {
      ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
    } else if (shape.type === "triangle") {
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y);
      ctx.lineTo(shape.x + shape.size, shape.y);
      ctx.lineTo(shape.x + shape.size / 2, shape.y - shape.size);
      ctx.closePath();
      ctx.fill();
    }

    // mișcare
    shape.x += shape.dx;
    shape.y += shape.dy;

    // coliziuni cu marginile
    if (shape.x < 0 || shape.x + shape.size > canvas.width) shape.dx *= -1;
    if (shape.y < 0 || shape.y + shape.size > canvas.height) shape.dy *= -1;
  });
}

createShapes();
setInterval(drawShapes, 30);
