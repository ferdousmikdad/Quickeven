import { checkCollision, playSound } from './utils.js';
import { GAME_CONFIG } from './config.js';

export class WordBlocks {
  constructor() {
    this.blocks = [];
    this.originalText = {
      h1: "QUICKEVEN",
      p: "Exploring design, technology, and AI through creative videos that inspire, educate, and connect people across digital platforms"
    };
    this.gameState = null;
  }

  init() {
    this.createWordBlocks();
  }

  createWordBlocks() {
    // Clear existing blocks first
    this.blocks = [];
    const pBlocksContainer = document.getElementById('pBlocks');
    pBlocksContainer.innerHTML = '';

    // Split the p text into individual words
    const pWords = this.originalText.p.split(' ');

    // Create word blocks for p text
    pWords.forEach((word, index) => {
      const block = this.createWordBlock(word, 'p', index);
      pBlocksContainer.appendChild(block);
      this.blocks.push(block);
    });

    // Get the h1 block (already in HTML)
    const h1Block = document.querySelector('.h1-block');
    if (h1Block) {
      this.blocks.push(h1Block);
    }

    console.log('Created', this.blocks.length, 'word blocks');
  }

  createWordBlock(word, type, index) {
    const block = document.createElement('div');
    block.className = 'word-block p-block inline-block text-md md:text-lg leading-relaxed text-gray-700 transition-all duration-300 pr-2';
    block.textContent = word;
    block.dataset.word = word;
    block.dataset.type = type;
    block.dataset.index = index;
    block.dataset.hits = '0';

    return block;
  }

  reset() {
    // Reset all blocks to original state
    this.blocks.forEach(block => {
      block.style.opacity = '1';
      block.style.transform = 'scale(1)';
      block.classList.remove('broken', 'damaged');
      block.dataset.hits = '0';

      if (block.dataset.type === 'p') {
        block.classList.remove('opacity-50', 'opacity-25');
      }
    });
  }

  getBlockRect(block) {
    return block.getBoundingClientRect();
  }

  checkCollisions(ball) {
    const ballRect = ball.getRect();

    this.blocks.forEach(block => {
      if (block.classList.contains('broken')) return;

      const blockRect = this.getBlockRect(block);

      if (checkCollision(ballRect, blockRect)) {
        this.handleBlockHit(block, ball, blockRect);
      }
    });
  }

  handleBlockHit(block, ball, blockRect) {
    const type = block.dataset.type;
    let currentHits = parseInt(block.dataset.hits);

    // Calculate bounce BEFORE breaking the block
    const ballRect = ball.getRect();
    this.calculateBounce(blockRect, ballRect, ball);

    if (type === 'h1') {
      currentHits++;
      block.dataset.hits = currentHits;

      if (currentHits === 1) {
        // First hit - reduce opacity
        block.classList.add('damaged');
        block.style.opacity = '0.5';
      } else if (currentHits >= 2) {
        // Second hit - break the block
        this.breakBlock(block);
      }
    } else if (type === 'p') {
      // P blocks break on first hit
      this.breakBlock(block);
    }
  }

  breakBlock(block) {
    block.classList.add('broken');

    // Add breaking animation
    block.style.transform = 'scale(0)';
    block.style.opacity = '0';

    // Play sound effect
    playSound('assets/sounds/bricksbreaker.mp3');

    // Increment score and blocks destroyed
    if (this.gameState) {
      const points = block.dataset.type === 'h1' ? 20 : 10;
      this.gameState.incrementScore(points);
      this.gameState.incrementBlocksDestroyed();
    }

    // Remove block from array after animation
    setTimeout(() => {
      const index = this.blocks.indexOf(block);
      if (index > -1) {
        this.blocks.splice(index, 1);
      }
    }, 300);
  }

  calculateBounce(blockRect, ballRect, ball) {
    // Simple and reliable bounce physics
    const ballCenterX = ball.position.x;
    const ballCenterY = ball.position.y;
    const blockCenterX = blockRect.left + blockRect.width / 2;
    const blockCenterY = blockRect.top + blockRect.height / 2;

    const dx = ballCenterX - blockCenterX;
    const dy = ballCenterY - blockCenterY;

    // Determine which side has the most overlap
    const overlapX = (blockRect.width / 2 + ball.radius) - Math.abs(dx);
    const overlapY = (blockRect.height / 2 + ball.radius) - Math.abs(dy);

    // Maintain current speed
    const currentSpeed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);

    // Bounce based on the side with less overlap (more accurate collision)
    if (overlapX < overlapY) {
      // Horizontal collision - reverse X velocity
      ball.velocity.x = -ball.velocity.x;

      // Push ball out of block to prevent sticking
      if (dx > 0) {
        ball.position.x = blockRect.right + ball.radius + 1;
      } else {
        ball.position.x = blockRect.left - ball.radius - 1;
      }
    } else {
      // Vertical collision - reverse Y velocity
      ball.velocity.y = -ball.velocity.y;

      // Push ball out of block to prevent sticking
      if (dy > 0) {
        ball.position.y = blockRect.bottom + ball.radius + 1;
      } else {
        ball.position.y = blockRect.top - ball.radius - 1;
      }
    }

    // Add some spin effect
    if (ball.angularVelocity !== undefined) {
      ball.angularVelocity += (Math.random() - 0.5) * 5;
    }

    // Ensure ball maintains consistent speed
    const newSpeed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);
    if (newSpeed > 0) {
      const factor = currentSpeed / newSpeed;
      ball.velocity.x *= factor;
      ball.velocity.y *= factor;
    }

    console.log('Word block collision - bounced back:', ball.velocity, 'overlapX:', overlapX, 'overlapY:', overlapY);
  }

  setGameState(gameState) {
    this.gameState = gameState;
  }
}