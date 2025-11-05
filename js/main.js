import { GameState } from './gameState.js';
import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { WordBlocks } from './wordBlocks.js';
import { GameEngine } from './gameEngine.js';
import { UI } from './ui.js';
import { GAME_CONFIG, GAME_STATE } from './config.js';

class BrickBreakerGame {
  constructor() {
    this.gameState = new GameState();
    this.paddle = new Paddle();
    this.ball = new Ball();
    this.wordBlocks = new WordBlocks();
    this.gameEngine = new GameEngine();
    this.ui = new UI();
    this.mouseTracking = false;

    this.init();
  }

  init() {
    this.wordBlocks.init();
    this.setupEventListeners();
    this.setupGameStateListeners();
    this.startMouseTracking();
  }

  startMouseTracking() {
    const playButton = document.getElementById('playButton');
    const menuScreen = document.getElementById('menuScreen');

    // Track mouse movement over the menu screen
    menuScreen.addEventListener('mousemove', (e) => {
      if (this.gameState.state === GAME_STATE.MENU) {
        const rect = menuScreen.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Position play button at mouse position (with offset to center)
        playButton.style.position = 'absolute';
        playButton.style.left = `${x}px`;
        playButton.style.top = `${y}px`;
        playButton.style.transform = 'translate(-50%, -50%)';
      }
    });

    // Touch support for mobile
    menuScreen.addEventListener('touchmove', (e) => {
      if (this.gameState.state === GAME_STATE.MENU) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = menuScreen.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        playButton.style.position = 'absolute';
        playButton.style.left = `${x}px`;
        playButton.style.top = `${y}px`;
        playButton.style.transform = 'translate(-50%, -50%)';
      }
    }, { passive: false });
  }

  setupEventListeners() {
    console.log('Setting up event listeners');

    // Menu interactions
    const playButton = document.getElementById('playButton');
    if (playButton) {
      playButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Play button clicked');
        this.startGame();
      });
    }

    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
      restartButton.addEventListener('click', () => {
        this.resetGame();
      });
    }

    // Settings
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        this.gameState.toggleSound();
        this.ui.updateSoundIcon(this.gameState.soundEnabled);
      });
    }

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        this.resetGame();
      });
    }

    // Ball lost listener
    document.addEventListener('ballLost', () => {
      this.gameState.lives--;
      if (this.gameState.lives <= 0) {
        this.gameState.setState(GAME_STATE.GAME_OVER);
      }
    });
  }

  setupGameStateListeners() {
    document.addEventListener('gameStateChange', (event) => {
      const { state } = event.detail;
      this.handleStateChange(state);
    });
  }

  handleStateChange(state) {
    switch (state) {
      case GAME_STATE.PLAYING:
        this.ui.showGameElements();
        this.gameEngine.start();
        break;
      case GAME_STATE.PAUSED:
        this.gameEngine.pause();
        break;
      case GAME_STATE.GAME_OVER:
        this.gameEngine.stop();
        this.ui.showGameOver(false);
        break;
      case GAME_STATE.WIN:
        this.gameEngine.stop();
        this.ui.showGameOver(true);
        break;
      case GAME_STATE.MENU:
        this.gameEngine.stop();
        this.ui.showMenu();
        break;
    }
  }

  startGame() {
    console.log('Starting game...');

    // Hide menu and show game
    const menuScreen = document.getElementById('menuScreen');
    if (menuScreen) {
      menuScreen.style.opacity = '0';
      menuScreen.style.pointerEvents = 'none';
    }

    const footer = document.getElementById('footer');
    if (footer) {
      footer.style.opacity = '0';
    }

    // Start game timer for speed acceleration
    this.gameState.startGameTimer();

    // Initialize game components
    console.log('Initializing paddle...');
    this.paddle.init();

    console.log('Initializing ball...');
    this.ball.gameState = this.gameState; // Connect ball to gameState for speed multiplier
    this.ball.init();

    // Start gameplay
    console.log('Setting game state to PLAYING...');
    this.gameState.isPlaying = true;
    this.gameState.setState(GAME_STATE.PLAYING);

    console.log('Initializing game engine...');
    this.gameEngine.init(this.gameState, this.paddle, this.ball, this.wordBlocks);

    // Setup ball launch after a brief delay
    console.log('Setting up ball launch...');
    this.setupBallLaunch();

    console.log('Game started successfully!');
  }

  setupBallLaunch() {
    const launchBall = (e) => {
      e.preventDefault();
      console.log('Launch ball clicked - ball.isLaunched:', this.ball.isLaunched, 'gameState:', this.gameState.state);

      if (!this.ball.isLaunched && this.gameState.state === GAME_STATE.PLAYING) {
        this.ball.launch();
        console.log('Ball launched successfully!');
        document.removeEventListener('click', launchBall);
        document.removeEventListener('touchstart', launchBall);
        document.removeEventListener('keydown', launchBall);
      }
    };

    // Also listen for spacebar
    const launchBallSpace = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        console.log('Spacebar pressed for launch');
        launchBall(e);
      }
    };

    // Add event listeners for ball launch
    setTimeout(() => {
      console.log('Adding ball launch event listeners');
      document.addEventListener('click', launchBall);
      document.addEventListener('touchstart', launchBall);
      document.addEventListener('keydown', launchBallSpace);
    }, 100);
  }

  resetGame() {
    this.gameState.reset();
    this.wordBlocks.reset();
    this.paddle.reset();
    this.ball.reset();
    this.ui.hideGameOver();
    this.ui.showMenu();
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new BrickBreakerGame();
});

// Export for external access if needed
window.BrickBreakerGame = BrickBreakerGame;