import { GAME_CONFIG } from './config.js';
import { checkCollision, getRandomVelocity } from './utils.js';

export class Ball {
  constructor() {
    this.element = document.getElementById('ball');
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.radius = GAME_CONFIG.ball.radius;
    this.isLaunched = false;
    this.isMobile = window.innerWidth <= 768;
    this.rotation = 0;
    this.angularVelocity = 0;
    this.gameState = null;
    this.baseSpeed = GAME_CONFIG.ball.speed;
    this.updateIconSize();
  }

  updateIconSize() {
    const size = this.isMobile ? GAME_CONFIG.ball.mobileSize : GAME_CONFIG.ball.size;
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
    this.radius = size / 2;
  }

  init() {
    this.reset();
  }

  reset() {
    // Position ball relative to paddle
    const paddleElement = document.getElementById('paddle');
    if (paddleElement) {
      const paddleRect = paddleElement.getBoundingClientRect();
      this.position.x = window.innerWidth / 2;
      this.position.y = window.innerHeight - 100; // Fixed position for initial reset
    } else {
      // Fallback to center screen
      this.position.x = window.innerWidth / 2;
      this.position.y = window.innerHeight - 100;
    }

    this.velocity = { x: 0, y: 0 };
    this.isLaunched = false;
    this.updatePosition();
  }

  launch() {
    if (!this.isLaunched) {
      const velocity = getRandomVelocity(GAME_CONFIG.ball.speed);
      this.velocity = {
        x: velocity.x,
        y: -Math.abs(velocity.y) // Always launch upward
      };
      this.isLaunched = true;
      console.log('Ball launched with velocity:', this.velocity);
    }
  }

  update() {
    if (!this.isLaunched) {
      // Follow paddle if not launched
      const paddleElement = document.getElementById('paddle');
      if (paddleElement) {
        const paddleRect = paddleElement.getBoundingClientRect();
        this.position.x = paddleRect.left + paddleRect.width / 2;
        this.position.y = paddleRect.top - this.radius - 5;
      }
      this.rotation = 0;
      this.angularVelocity = 0;
      this.updatePosition();
      return;
    }

    // Update position based on velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Apply game physics (no friction to maintain speed)
    this.velocity.x *= GAME_CONFIG.game.friction;
    this.velocity.y *= GAME_CONFIG.game.friction;

    // Update rotation based on velocity
    this.angularVelocity = this.velocity.x * 0.1; // Rotate based on horizontal movement
    this.rotation += this.angularVelocity;

    // Maintain consistent speed
    this.maintainSpeed();

    // Check collisions
    this.checkWallCollisions();
    this.checkPaddleCollision();

    this.updatePosition();
  }

  maintainSpeed() {
    if (!this.gameState) return;

    const speedMultiplier = this.gameState.getSpeedMultiplier();
    const targetSpeed = this.baseSpeed * speedMultiplier;
    const currentSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);

    // Adjust speed to match target speed with multiplier
    if (Math.abs(currentSpeed - targetSpeed) > 0.1) {
      const factor = targetSpeed / currentSpeed;
      this.velocity.x *= factor;
      this.velocity.y *= factor;
    }

    // Ensure speed doesn't exceed maximum
    const maxSpeed = GAME_CONFIG.game.maxSpeed;
    if (currentSpeed > maxSpeed) {
      const factor = maxSpeed / currentSpeed;
      this.velocity.x *= factor;
      this.velocity.y *= factor;
    }

    // Log speed changes occasionally
    if (Math.random() < 0.001) { // Log occasionally to avoid spam
      console.log(`Ball speed: ${currentSpeed.toFixed(2)}, Multiplier: ${speedMultiplier.toFixed(2)}, Target: ${targetSpeed.toFixed(2)}`);
    }
  }

  checkWallCollisions() {
    const ballRadius = this.radius;

    // Left wall
    if (this.position.x - ballRadius <= 0) {
      this.position.x = ballRadius;
      this.velocity.x = Math.abs(this.velocity.x); // No speed loss
    }

    // Right wall
    if (this.position.x + ballRadius >= window.innerWidth) {
      this.position.x = window.innerWidth - ballRadius;
      this.velocity.x = -Math.abs(this.velocity.x); // No speed loss
    }

    // Top wall
    if (this.position.y - ballRadius <= 0) {
      this.position.y = ballRadius;
      this.velocity.y = Math.abs(this.velocity.y); // No speed loss
    }

    // Bottom wall (ball lost)
    if (this.position.y + ballRadius >= window.innerHeight) {
      this.handleBallLost();
    }
  }

  checkPaddleCollision() {
    const paddleElement = document.getElementById('paddle');
    if (!paddleElement) return;

    const ballRect = this.getRect();
    const paddleRect = paddleElement.getBoundingClientRect();

    if (checkCollision(ballRect, paddleRect)) {
      // Ball hit the paddle
      this.position.y = paddleRect.top - this.radius;

      // Calculate bounce angle based on where ball hits paddle
      const paddleCenter = paddleRect.left + paddleRect.width / 2;
      const hitPosition = (this.position.x - paddleCenter) / (paddleRect.width / 2);

      // Get current speed multiplier
      const speedMultiplier = this.gameState ? this.gameState.getSpeedMultiplier() : 1.0;
      const targetSpeed = this.baseSpeed * speedMultiplier;
      const maxAngle = Math.PI / 2.5; // 72 degrees max angle for more dynamic play

      // Calculate angle based on hit position (-maxAngle to +maxAngle)
      const angle = hitPosition * maxAngle;

      // Add some spin based on hit position for more realistic physics
      const spinFactor = hitPosition * 0.2;
      this.angularVelocity = spinFactor * targetSpeed;

      // Set velocities to maintain constant speed with multiplier
      this.velocity.x = Math.sin(angle) * targetSpeed;
      this.velocity.y = -Math.cos(angle) * targetSpeed; // Always upward

      // Add some English (side spin) effect
      this.velocity.x += spinFactor * 2;

      console.log('Paddle collision, new velocity:', this.velocity, 'speedMultiplier:', speedMultiplier, 'spin:', spinFactor);
    }
  }

  handleBallLost() {
    console.log('Ball lost!');
    this.reset();

    // Notify game engine of ball lost
    const event = new CustomEvent('ballLost', {
      detail: { ball: this }
    });
    document.dispatchEvent(event);
  }

  getRect() {
    return {
      x: this.position.x - this.radius,
      y: this.position.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }

  updatePosition() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
    this.element.style.transform = `translate(-50%, -50%) rotate(${this.rotation}deg)`;
  }
}