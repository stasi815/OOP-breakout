class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10, color = 'blue') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.twoPI = Math.PI * 2;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.twoPI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
