import Sprite from 'game/sprite.js'

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color);
    this.status = true;
    this.padding = 10;
    this.marginTop = 30;
    this.marginLeft = 30;
  }
}

export default Brick;
