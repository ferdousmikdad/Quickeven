import { GAME_CONFIG } from './config.js';

export class Paddle {
  constructor() {
    this.element = document.getElementById('paddle');
    this.position = { x: 0, y: 0 };
    this.targetX = 0;
    this.velocity = { x: 0 };
    this.controlsSetup = false;
  }

  init() {
    if (!this.controlsSetup) {
      this.setupControls();
      this.controlsSetup = true;
    }
    this.element.style.pointerEvents = 'auto';
    this.reset();
  }

  reset() {
    // Center paddle
    this.position.x = window.innerWidth / 2;
    this.targetX = this.position.x;
    this.updatePosition();
  }

  setupControls() {
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
    });

    // Touch movement for mobile
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.targetX = e.touches[0].clientX;
      }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          this.targetX = Math.max(GAME_CONFIG.paddle.width / 2, this.targetX - 20);
          break;
        case 'ArrowRight':
          this.targetX = Math.min(window.innerWidth - GAME_CONFIG.paddle.width / 2, this.targetX + 20);
          break;
      }
    });
  }

  update() {
    // Smooth movement towards target
    const diff = this.targetX - this.position.x;
    this.velocity.x = diff * 0.15; // Smooth following

    this.position.x += this.velocity.x;

    // Keep paddle within bounds
    const halfWidth = GAME_CONFIG.paddle.width / 2;
    this.position.x = Math.max(halfWidth, Math.min(window.innerWidth - halfWidth, this.position.x));

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.transform = `translateX(-50%)`;
  }

  getRect() {
    const rect = this.element.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    };
  }

  getCenterPosition() {
    const rect = this.getRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }
}