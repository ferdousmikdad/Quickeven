import { GAME_STATE, SOUND_SETTINGS, GAME_CONFIG } from './config.js';

export class GameState {
  constructor() {
    this.state = GAME_STATE.MENU;
    this.score = 0;
    this.lives = 3;
    this.soundEnabled = SOUND_SETTINGS.enabled;
    this.isPlaying = false;
    this.blocksDestroyed = 0;
    this.totalBlocks = 0;
    this.paddlePosition = { x: 0, y: 0 };
    this.ballPosition = { x: 0, y: 0 };
    this.ballVelocity = { x: 0, y: 0 };
    this.blocks = [];
    this.currentSpeedMultiplier = 1.0;
    this.gameStartTime = 0;
  }

  setState(newState) {
    this.state = newState;
    this.triggerStateChange();
    console.log('GameState changed to:', newState);
  }

  triggerStateChange() {
    // Dispatch custom event for state changes
    const event = new CustomEvent('gameStateChange', {
      detail: { state: this.state, gameState: this }
    });
    document.dispatchEvent(event);
  }

  reset() {
    this.score = 0;
    this.lives = 3;
    this.blocksDestroyed = 0;
    this.isPlaying = false;
    this.blocks = [];
    this.totalBlocks = 0;
    this.currentSpeedMultiplier = 1.0;
    this.gameStartTime = 0;
    console.log('GameState reset');
    this.setState(GAME_STATE.MENU);
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    SOUND_SETTINGS.enabled = this.soundEnabled;
  }

  incrementScore(points = 10) {
    this.score += points;
  }

  incrementBlocksDestroyed() {
    this.blocksDestroyed++;
    const isMobile = window.innerWidth <= 768;

    // Increase speed when blocks are destroyed
    if (GAME_CONFIG.game.acceleration.enabled) {
      const speedIncrease = isMobile ? GAME_CONFIG.game.acceleration.mobileSpeedIncrease : GAME_CONFIG.game.acceleration.speedIncrease;
      const maxMultiplier = isMobile ? GAME_CONFIG.game.acceleration.mobileMaxMultiplier : GAME_CONFIG.game.acceleration.maxMultiplier;

      this.currentSpeedMultiplier = Math.min(
        this.currentSpeedMultiplier + speedIncrease,
        maxMultiplier
      );
      console.log('Speed increased to multiplier:', this.currentSpeedMultiplier, 'isMobile:', isMobile);
    }

    if (this.blocksDestroyed >= this.totalBlocks) {
      this.setState(GAME_STATE.WIN);
    }
  }

  getSpeedMultiplier() {
    if (!GAME_CONFIG.game.acceleration.enabled) {
      return 1.0;
    }

    const isMobile = window.innerWidth <= 768;

    // Add time-based acceleration
    const elapsedTime = this.isPlaying ? (Date.now() - this.gameStartTime) / 1000 : 0;
    const intervalIncrease = isMobile ? GAME_CONFIG.game.acceleration.mobileIntervalIncrease : GAME_CONFIG.game.acceleration.intervalIncrease;
    const maxMultiplier = isMobile ? GAME_CONFIG.game.acceleration.mobileMaxMultiplier : GAME_CONFIG.game.acceleration.maxMultiplier;
    const timeBasedIncrease = elapsedTime * intervalIncrease;

    return Math.min(
      this.currentSpeedMultiplier + timeBasedIncrease,
      maxMultiplier
    );
  }

  startGameTimer() {
    this.gameStartTime = Date.now();
    this.currentSpeedMultiplier = 1.0;
  }
}