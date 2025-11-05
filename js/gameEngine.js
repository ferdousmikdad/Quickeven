import { GAME_STATE } from './config.js';

export class GameEngine {
  constructor() {
    this.gameLoop = null;
    this.isRunning = false;
    this.gameState = null;
    this.paddle = null;
    this.ball = null;
    this.wordBlocks = null;
  }

  init(gameState, paddle, ball, wordBlocks) {
    this.gameState = gameState;
    this.paddle = paddle;
    this.ball = ball;
    this.wordBlocks = wordBlocks;

    // Connect wordBlocks to gameState
    this.wordBlocks.setGameState(gameState);
    this.gameState.totalBlocks = this.wordBlocks.blocks.length;

    console.log('GameEngine initialized with', this.gameState.totalBlocks, 'blocks');
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('GameEngine started');
    this.gameLoop = requestAnimationFrame(() => this.update());
  }

  pause() {
    this.isRunning = false;
    console.log('GameEngine paused');
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
    }
  }

  stop() {
    this.pause();
    console.log('GameEngine stopped');
  }

  update() {
    if (!this.isRunning) return;

    // Update game components
    this.paddle.update();
    this.ball.update();
    this.wordBlocks.checkCollisions(this.ball);

    // Check win condition
    if (this.gameState.blocksDestroyed >= this.gameState.totalBlocks) {
      this.gameState.setState(GAME_STATE.WIN);
    }

    this.gameLoop = requestAnimationFrame(() => this.update());
  }
}