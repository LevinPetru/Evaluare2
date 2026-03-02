const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const box = 20;
let snake, direction, score, food, bomb, gameOver, game;

function initGame() {
  snake = [{x: 9*box, y: 10*box}];
  direction = "RIGHT";
  score = 0;
  gameOver = false;
  food = randomPosition();
  bomb = randomPosition();
  restartBtn.style.display = "none";
  status.textContent = "Scor: " + score;
  clearInterval(game);
  game = setInterval(draw, 120);
}

function randomPosition() {
  return {
    x: Math.floor(Math.random()*29+1) * box,
    y: Math.floor(Math.random()*19+1) * box
  };
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

restartBtn.addEventListener("click", initGame);

function drawSnakeSegment(x, y, isHead=false) {
  ctx.fillStyle = isHead ? "limegreen" : "green";
  ctx.beginPath();
  ctx.roundRect(x, y, box, box, 6);
  ctx.fill();
  ctx.strokeStyle = "darkgreen";
  ctx.strokeRect(x, y, box, box);
}

function draw() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", canvas.width/2 - 100, canvas.height/2);
    status.textContent = "Scor final: " + score;
    restartBtn.style.display = "inline-block";
    clearInterval(game);
    return;
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // desenăm șarpele
  for (let i=0; i<snake.length; i++) {
    drawSnakeSegment(snake[i].x, snake[i].y, i===0);
  }

  // desenăm mărul (emoji 🍎)
  ctx.font = "20px Arial";
  ctx.fillText("🍎", food.x, food.y+box);

  // desenăm bomba (emoji 💣)
  ctx.font = "20px Arial";
  ctx.fillText("💣", bomb.x, bomb.y+box);

  // poziția capului
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // wrap-around pereți
  if (snakeX < 0) snakeX = canvas.width - box;
  if (snakeX >= canvas.width) snakeX = 0;
  if (snakeY < 0) snakeY = canvas.height - box;
  if (snakeY >= canvas.height) snakeY = 0;

  // dacă mănâncă mărul
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = randomPosition();
  } else {
    snake.pop();
  }

  // dacă atinge bomba
  if (snakeX === bomb.x && snakeY === bomb.y) {
    gameOver = true;
  }

  // noul cap
  let newHead = {x: snakeX, y: snakeY};

  // coliziune cu corpul
  for (let i=0; i<snake.length; i++) {
    if (snakeX === snake[i].x && snakeY === snake[i].y) {
      gameOver = true;
    }
  }

  snake.unshift(newHead);

  status.textContent = "Scor: " + score;
}

// start joc
initGame();

