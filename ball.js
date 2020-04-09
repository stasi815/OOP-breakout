class Ball {
    constructor(x, y, dx = 2, dy = -2, radius = 10, color = 'red') {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    move() {
        this.x += this.dx
        this.y += this.dy;
    }

}

const ball = new Ball(0, 0, 2, -2, 10, 'blue');