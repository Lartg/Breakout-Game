/* eslint-disable no-alert */
import Brick from './game/brick.js'
import Ball from './game/ball.js'
import Score from './game/score.js'
import Lives from '/game/lives.js'
import Paddle from './game/paddle.js'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const score = new Score();
const lives = new Lives();
const ball = new Ball(200, 200, 10);
const paddle = new Paddle((canvas.width / 2));
// generate bricks
const bricks = [];
const brickColumnCount = 5;
const brickRowCount = 3;
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = new Brick(0, 0);
  }
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === true) {
        const brickX = c * (b.width + b.padding) + b.marginLeft;
        const brickY = r * (b.height + b.padding) + b.marginTop;
        b.x = brickX;
        b.y = brickY;
        b.render();
      }
    }
  }
}

function brickCollisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === true) {
        if (
          ball.x > b.x
          && ball.x < b.x + b.width
          && ball.y > b.y
          && ball.y < b.y + b.height
        ) {
          ball.dy = -ball.dy;
          b.status = false;
          score.score += 1;
          if (score.score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function draw() {
  // reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw game elements
  ball.render();
  paddle.render();
  brickCollisionDetection();
  drawBricks();
  score.render();
  lives.render();

  // ball collisions
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives.lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  // apply change
  ball.move();
  paddle.move();
  // repeatedly call draw
  requestAnimationFrame(draw);
}

draw();

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

// paddle movement
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mouseEvent', mouseMoveHandler, false);