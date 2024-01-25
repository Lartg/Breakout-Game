import Sprite from './sprite.js' // eslint-disable-line

class Paddle extends Sprite {
  constructor(x, y, height = 10, width = 75, color = '#0095DD') {
    super(x - (width / 2), y - height, width, height, color);
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
}

export default Paddle;
