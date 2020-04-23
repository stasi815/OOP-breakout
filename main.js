/* eslint-disable max-classes-per-file */
// **************************************************************
// DOM references
// **************************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// **************************************************************
// Variables
// **************************************************************

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const objectColor = '#0095DD';
const gameFont ='16px Arial';
const canvasWidth = 480;
const canvasHeight = 320;
const startPositionX = canvasWidth / 2;
const startPositionY = canvasHeight - 30;
const paddleXStart = (canvasWidth - paddleWidth) / 2;
const paddleYStart = canvasHeight - paddleHeight;
const twoPI = Math.PI * 2;
const winAlert = 'YOU WIN, CONGRATULATIONS!';
const gameOver = 'GAME OVER';

// Object Classes, move global variables to objects

class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10, color = 'blue') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, twoPI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}


class Brick {
  constructor(x, y, width, height, color = 'blue') {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  // eslint-disable-next-line no-shadow
  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// owns bricks array, brick init, draw bricks
class Bricks {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

        this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}

class Paddle {
  constructor(x, y, width, height, color = 'red') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}


// Score & Lives

class GameLabel {
  constructor(text, x, y, color, font = gameFont) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}

class BreakoutGame {
  constructor() {
    this.ball = new Ball(0, 2, -2, ballRadius);
    this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight);
    this.bricks = new Bricks(brickColumnCount, brickRowCount);
    this.scoreLabel = new GameLabel('Score', 8, 20);
    this.livesLabel = new GameLabel('Lives', canvasWidth - 65, 20);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();
    this.draw();
  }

  setup() {
    this.livesLabel.value = 3;
    // eslint-disable-next-line no-use-before-define
    this.resetBallAndPaddle();
    // Register Events


    document.addEventListener('keydown', (e) => {
      this.keyDownHandler(e);
    }, false);
    document.addEventListener('keyup', (e) => {
      this.keyUpHandler(e);
    }, false);
    document.addEventListener('mousemove', (e) => {
      this.mouseMoveHandler(e);
    }, false);
  }

  resetBallAndPaddle() {
    this.ball.x = startPositionX;
    this.ball.y = startPositionY;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          // eslint-disable-next-line max-len
          if (this.ball.x > brick.x && this.ball.x < brick.x + brickWidth && this.ball.y > brick.y && this.ball.y < brick.y + brickHeight) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;
            if (this.scoreLabel.value === this.bricks.rows * this.bricks.cols) {
              // eslint-disable-next-line no-alert
              alert(winAlert);
              document.location.reload();
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < canvasWidth - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionsWithCanvasAndPaddle() {
    // Bounce the ball off the left and right of the canvas
    // eslint-disable-next-line max-len
    if (this.ball.x + this.ball.dx > canvasWidth - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    // Bounce the this.ball off the top, paddle, or hit the bottom of the canvas
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      // hit the top
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvasHeight - this.ball.radius) {
      // hit the bottom
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        // Hit the paddle
        this.ball.dy = -this.ball.dy;
      } else {
        // Lose a life
        this.livesLabel.value -= 1;
        if (this.livesLabel.value < 1) {
          // Game Over
          // eslint-disable-next-line no-alert
          alert(gameOver);
          this.ball.x = 200;
          this.ball.y = 200;
          document.location.reload();
        } else {
          // Start the over you hit the bottom
          this.resetBallAndPaddle();
        }
      }
    }
  }

  //--------------------------------------------------------------
  // Event Listeners
  // --------------------------------------------------------------

  keyDownHandler(e) {
    if (e.keyCode === 39) {
      this.rightPressed = true;
    } else if (e.keyCode === 37) {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.keyCode === 39) {
      this.rightPressed = false;
    } else if (e.keyCode === 37) {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvasWidth) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
  }

  draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreLabel.render(ctx);
    this.livesLabel.render(ctx);
    this.collisionDetection();
    this.ball.move();
    this.movePaddle();
    this.collisionsWithCanvasAndPaddle();

    // Draw the screen again
    requestAnimationFrame(() => {
      this.draw();
    });
  }
}

const game = new BreakoutGame();

// **************************************************************
// Starts program entry point
// **************************************************************
