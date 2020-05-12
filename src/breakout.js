
// -------------------------

// Game

// -------------------------

import Ball from './ball';
import Bricks from './bricks';
import Sprite from './sprite';
import GameLabel from './gamelabel';


class BreakoutGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.ballRadius = 10;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.color = '#0095DD';
    this.gameFont ='16px Arial';
    this.canvasWidth = 480;
    this.canvasHeight = 320;
    this.startPositionX = this.canvasWidth / 2;
    this.startPositionY = this.canvasHeight - 30;
    this.paddleXStart = (this.canvasWidth - this.paddleWidth) / 2;
    this.paddleYStart = this.canvasHeight - this.paddleHeight;
    this.winAlert = 'YOU WIN, CONGRATULATIONS!';
    this.gameOver = 'GAME OVER';

    this.ball = new Ball(0, 2, -2, this.ballRadius);
    this.paddle = new Sprite(this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight);

    this.bricks = new Bricks({
      cols: this.brickColumnCount,
      rows: this.brickRowCount,
      width: this.brickWidth,
      height: this.brickHeight,
      padding: this.brickPadding,
      offsetLeft: this.brickOffsetLeft,
      offsetTop: this.brickOffsetTop,
      color: this.color,
    });

    this.scoreLabel = new GameLabel('Score', 8, 20, this.color);
    this.livesLabel = new GameLabel('Lives', this.canvasWidth - 65, 20, this.color);

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
    this.ball.x = this.startPositionX;
    this.ball.y = this.startPositionY;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = this.paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
        // eslint-disable-next-line max-len
          if (this.ball.x > brick.x && this.ball.x < brick.x + this.brickWidth && this.ball.y > brick.y && this.ball.y < brick.y + this.brickHeight) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;
            if (this.scoreLabel.value === this.bricks.rows * this.bricks.cols) {
            // eslint-disable-next-line no-alert
              alert(this.winAlert);
              document.location.reload();
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < this.canvasWidth - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionsWithCanvasAndPaddle() {
    // Bounce the ball off the left and right of the canvas
    // eslint-disable-next-line max-len
    if (this.ball.x + this.ball.dx > this.canvasWidth - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    // Bounce the this.ball off the top, paddle, or hit the bottom of the canvas
    if (this.ball.y + this.ball.dy < this.ball.radius) {
    // hit the top
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvasHeight - this.ball.radius) {
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
          alert(this.gameOver);
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
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvasWidth) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
  }

  draw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.bricks.render(this.ctx);
    console.log(this.bricks);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
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

export default BreakoutGame;
