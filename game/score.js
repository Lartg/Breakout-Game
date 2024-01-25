class Score {
  constructor(score = 0) {
    this.score = score;
  }

  draw(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}
export default Score;
