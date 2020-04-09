class Brick {
  constructor(x, y, color = 'orange') {
    this.x = x;
    this.y = y;
    this.width = brickWidth;
    this.height = brickHeight;
    this.status = 1;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height, brickWidth, brickHeight);
    ctx.fillStyle = objectColor; // * Could be good as a constant
    ctx.fill();
    ctx.closePath();
  }
}

// bricks[c][r] = new Brick(0,0)