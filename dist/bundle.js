/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n// -------------------------\n\n// Game\n\n// -------------------------\n\n\n\nclass Ball extends _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10, color = 'blue') {\n    super(x, y, radius * 2, radius * 2, color);\n\n    this.dx = dx;\n    this.dy = dy;\n    this.radius = radius;\n\n    this.twoPI = Math.PI * 2;\n  }\n\n  move() {\n    this.moveBy(this.dx, this.dy);\n  }\n\n  render(ctx) { // overrides the method from super class\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, this.twoPI);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/breakout.js":
/*!*************************!*\
  !*** ./src/breakout.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\n/* harmony import */ var _bricks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bricks */ \"./src/bricks.js\");\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n/* harmony import */ var _gamelabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gamelabel */ \"./src/gamelabel.js\");\n\n// -------------------------\n\n// Game\n\n// -------------------------\n\n\n\n\n\n\n\nclass BreakoutGame {\n  constructor(canvasId) {\n    this.canvas = document.getElementById(canvasId);\n    this.ctx = this.canvas.getContext('2d');\n\n    this.ballRadius = 10;\n    this.paddleHeight = 10;\n    this.paddleWidth = 75;\n    this.brickRowCount = 3;\n    this.brickColumnCount = 5;\n    this.brickWidth = 75;\n    this.brickHeight = 20;\n    this.brickPadding = 10;\n    this.brickOffsetTop = 30;\n    this.brickOffsetLeft = 30;\n    this.color = '#0095DD';\n    this.gameFont ='16px Arial';\n    this.canvasWidth = 480;\n    this.canvasHeight = 320;\n    this.startPositionX = this.canvasWidth / 2;\n    this.startPositionY = this.canvasHeight - 30;\n    this.paddleXStart = (this.canvasWidth - this.paddleWidth) / 2;\n    this.paddleYStart = this.canvasHeight - this.paddleHeight;\n    this.winAlert = 'YOU WIN, CONGRATULATIONS!';\n    this.gameOver = 'GAME OVER';\n\n    this.ball = new _ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 2, -2, this.ballRadius);\n    this.paddle = new _sprite__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight);\n\n    this.bricks = new _bricks__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      cols: this.brickColumnCount,\n      rows: this.brickRowCount,\n      width: this.brickWidth,\n      height: this.brickHeight,\n      padding: this.brickPadding,\n      offsetLeft: this.brickOffsetLeft,\n      offsetTop: this.brickOffsetTop,\n      color: this.color,\n    });\n\n    this.scoreLabel = new _gamelabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"]('Score', 8, 20, this.color);\n    this.livesLabel = new _gamelabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"]('Lives', this.canvasWidth - 65, 20, this.color);\n\n    this.rightPressed = false;\n    this.leftPressed = false;\n\n    this.setup();\n    this.draw();\n  }\n\n  setup() {\n    this.livesLabel.value = 3;\n    // eslint-disable-next-line no-use-before-define\n    this.resetBallAndPaddle();\n    // Register Events\n\n\n    document.addEventListener('keydown', (e) => {\n      this.keyDownHandler(e);\n    }, false);\n    document.addEventListener('keyup', (e) => {\n      this.keyUpHandler(e);\n    }, false);\n    document.addEventListener('mousemove', (e) => {\n      this.mouseMoveHandler(e);\n    }, false);\n  }\n\n  resetBallAndPaddle() {\n    this.ball.x = this.startPositionX;\n    this.ball.y = this.startPositionY;\n    this.ball.dx = 2;\n    this.ball.dy = -2;\n    this.paddle.x = this.paddleXStart;\n  }\n\n  collisionDetection() {\n    for (let c = 0; c < this.bricks.cols; c += 1) {\n      for (let r = 0; r < this.bricks.rows; r += 1) {\n        const brick = this.bricks.bricks[c][r];\n        if (brick.status === 1) {\n        // eslint-disable-next-line max-len\n          if (this.ball.x > brick.x && this.ball.x < brick.x + this.brickWidth && this.ball.y > brick.y && this.ball.y < brick.y + this.brickHeight) {\n            this.ball.dy = -this.ball.dy;\n            brick.status = 0;\n            this.scoreLabel.value += 1;\n            if (this.scoreLabel.value === this.bricks.rows * this.bricks.cols) {\n            // eslint-disable-next-line no-alert\n              alert(this.winAlert);\n              document.location.reload();\n            }\n          }\n        }\n      }\n    }\n  }\n\n  movePaddle() {\n    if (this.rightPressed && this.paddle.x < this.canvasWidth - this.paddle.width) {\n      this.paddle.moveBy(7, 0);\n    } else if (this.leftPressed && this.paddle.x > 0) {\n      this.paddle.moveBy(-7, 0);\n    }\n  }\n\n  collisionsWithCanvasAndPaddle() {\n    // Bounce the ball off the left and right of the canvas\n    // eslint-disable-next-line max-len\n    if (this.ball.x + this.ball.dx > this.canvasWidth - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {\n      this.ball.dx = -this.ball.dx;\n    }\n    // Bounce the this.ball off the top, paddle, or hit the bottom of the canvas\n    if (this.ball.y + this.ball.dy < this.ball.radius) {\n    // hit the top\n      this.ball.dy = -this.ball.dy;\n    } else if (this.ball.y + this.ball.dy > this.canvasHeight - this.ball.radius) {\n    // hit the bottom\n      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {\n        // Hit the paddle\n        this.ball.dy = -this.ball.dy;\n      } else {\n        // Lose a life\n        this.livesLabel.value -= 1;\n        if (this.livesLabel.value < 1) {\n        // Game Over\n        // eslint-disable-next-line no-alert\n          alert(this.gameOver);\n          this.ball.x = 200;\n          this.ball.y = 200;\n          document.location.reload();\n        } else {\n        // Start the over you hit the bottom\n          this.resetBallAndPaddle();\n        }\n      }\n    }\n  }\n\n  //--------------------------------------------------------------\n  // Event Listeners\n  // --------------------------------------------------------------\n\n  keyDownHandler(e) {\n    if (e.keyCode === 39) {\n      this.rightPressed = true;\n    } else if (e.keyCode === 37) {\n      this.leftPressed = true;\n    }\n  }\n\n  keyUpHandler(e) {\n    if (e.keyCode === 39) {\n      this.rightPressed = false;\n    } else if (e.keyCode === 37) {\n      this.leftPressed = false;\n    }\n  }\n\n  mouseMoveHandler(e) {\n    const relativeX = e.clientX - this.canvas.offsetLeft;\n    if (relativeX > 0 && relativeX < this.canvasWidth) {\n      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);\n    }\n  }\n\n  draw() {\n    // Clear the canvas\n    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\n    this.bricks.render(this.ctx);\n    console.log(this.bricks);\n    this.ball.render(this.ctx);\n    this.paddle.render(this.ctx);\n    this.scoreLabel.render(this.ctx);\n    this.livesLabel.render(this.ctx);\n    this.collisionDetection();\n    this.ball.move();\n    this.movePaddle();\n    this.collisionsWithCanvasAndPaddle();\n\n    // Draw the screen again\n    requestAnimationFrame(() => {\n      this.draw();\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BreakoutGame);\n\n\n//# sourceURL=webpack:///./src/breakout.js?");

/***/ }),

/***/ "./src/brick.js":
/*!**********************!*\
  !*** ./src/brick.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n// -------------------------\n\n// Brick\n\n// -------------------------\n\n\n\nclass Brick extends _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, width, height, color = '#0095DD') {\n    super(x, y, width, height, color);\n\n    this.status = 1;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Brick);\n\n\n//# sourceURL=webpack:///./src/brick.js?");

/***/ }),

/***/ "./src/bricks.js":
/*!***********************!*\
  !*** ./src/bricks.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _brick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brick */ \"./src/brick.js\");\n\n\nclass Bricks {\n  constructor({\n    cols,\n    rows,\n    width,\n    height,\n    padding,\n    offsetLeft,\n    offsetTop,\n    color,\n  }) {\n    this.cols = cols;\n    this.rows = rows;\n    this.bricks = [];\n    this.width = width;\n    this.height = height;\n    this.padding = padding;\n    this.offsetLeft = offsetLeft;\n    this.offsetTop = offsetTop;\n    this.color = color;\n    this.init();\n  }\n\n  init() {\n    for (let c = 0; c < this.cols; c += 1) {\n      this.bricks[c] = [];\n      for (let r = 0; r < this.rows; r += 1) {\n        const brickX = (c * (this.width + this.padding)) + this.offsetLeft;\n        const brickY = (r * (this.height + this.padding)) + this.offsetTop;\n\n        this.bricks[c][r] = new _brick__WEBPACK_IMPORTED_MODULE_0__[\"default\"](brickX, brickY, this.width, this.height, this.color);\n      }\n    }\n  }\n\n  render(ctx) {\n    for (let c = 0; c < this.cols; c += 1) {\n      for (let r = 0; r < this.rows; r += 1) {\n        const brick = this.bricks[c][r];\n        if (brick.status === 1) {\n          brick.render(ctx);\n        }\n      }\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bricks);\n\n\n//# sourceURL=webpack:///./src/bricks.js?");

/***/ }),

/***/ "./src/gamelabel.js":
/*!**************************!*\
  !*** ./src/gamelabel.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\n// -------------------------\n\n// GameLabel\n\n// -------------------------\n\n\nclass GameLabel extends _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(text, x, y, color, font = '16px Arial') {\n    super(x, y, 0, 0, color);\n    this.text = text;\n    this.value = 0;\n    this.font = font;\n  }\n\n  render(ctx) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameLabel);\n\n\n//# sourceURL=webpack:///./src/gamelabel.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _breakout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./breakout */ \"./src/breakout.js\");\n// ------------------------------------------\n// Breakout Game\n// ------------------------------------------\n\n\n\nconst game = new _breakout__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('myCanvas');\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// -------------------------\n\n// Sprite\n\n// -------------------------\n\nclass Sprite {\n  constructor( x = 0, y = 0, width = 10, height = 10, color = 'red') {\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.color = color;\n  }\n\n  moveBy(dx, dy) {\n    this.x += dx;\n    this.y += dy;\n  }\n\n  moveTo(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sprite);\n\n\n//# sourceURL=webpack:///./src/sprite.js?");

/***/ })

/******/ });