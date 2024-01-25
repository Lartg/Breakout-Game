class Paddle {
  constructor(x, height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.x = x - (width / 2);
    this.rightPressed = false;
    this.leftPressed = false;
  }

  move(canvas) {
    // paddle movement
    if (this.rightPressed) {
      this.x += 7;
      if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
      }
    } else if (this.leftPressed) {
      this.x -= 7;
      if (this.x < 0) {
        this.x = 0;
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e, canvas) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.w = relativeX - this.width / 2;
    }
  }
}

export default Paddle;

// paddle movement
// document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);
