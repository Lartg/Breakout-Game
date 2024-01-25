class Lives {
  constructor(lives = 3) {
    this.lives = lives;
  }

  render(ctx, canvas) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 100, 20);
  }
}

export default Lives;
