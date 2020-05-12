// -------------------------

// Game

// -------------------------

import Sprite from './sprite';

class Ball extends Sprite {
  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10, color = 'blue') {
    super(x, y, radius * 2, radius * 2, color);

    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.twoPI = Math.PI * 2;
  }

  move() {
    this.moveBy(this.dx, this.dy);
  }

  render(ctx) { // overrides the method from super class
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.twoPI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
