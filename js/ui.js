import { GAME_STATE } from './config.js';

export class UI {
  constructor() {
    this.gameElements = document.getElementById('gameElements');
    this.menuScreen = document.getElementById('menuScreen');
    this.gameOverScreen = document.getElementById('gameOverScreen');
    this.footer = document.getElementById('footer');
    this.soundIcon = document.getElementById('soundIcon');
  }

  showMenu() {
    if (this.menuScreen) {
      this.menuScreen.style.opacity = '1';
      this.menuScreen.style.pointerEvents = 'auto';
    }
    if (this.gameElements) {
      this.gameElements.style.opacity = '0';
      this.gameElements.style.pointerEvents = 'none';
    }
    if (this.footer) {
      this.footer.style.opacity = '1';
    }
    if (this.gameOverScreen) {
      this.gameOverScreen.style.opacity = '0';
      this.gameOverScreen.style.pointerEvents = 'none';
    }
  }

  showGameElements() {
    if (this.menuScreen) {
      this.menuScreen.style.opacity = '0';
      this.menuScreen.style.pointerEvents = 'none';
    }
    if (this.gameElements) {
      this.gameElements.style.opacity = '1';
      this.gameElements.style.pointerEvents = 'auto';
    }
    if (this.footer) {
      this.footer.style.opacity = '0';
    }
  }

  showGameOver(isWin) {
    const title = document.getElementById('gameOverTitle');
    const finalScore = document.getElementById('finalScore');

    if (title) {
      title.textContent = isWin ? 'You Win!' : 'Game Over';
    }
    if (finalScore) {
      finalScore.textContent = this.getCurrentScore();
    }

    if (this.gameOverScreen) {
      this.gameOverScreen.classList.add('show');
    }
  }

  hideGameOver() {
    if (this.gameOverScreen) {
      this.gameOverScreen.classList.remove('show');
    }
  }

  updateSoundIcon(soundEnabled) {
    if (soundEnabled) {
      this.soundIcon.innerHTML = `
        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"></path>
      `;
    } else {
      this.soundIcon.innerHTML = `
        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      `;
    }
  }

  getCurrentScore() {
    // Since we removed the score display, return a default value
    return '0';
  }

  showLives(lives) {
    // Could implement lives display here if needed
  }

  showMessage(message, duration = 2000) {
    const messageEl = document.createElement('div');
    messageEl.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold z-50';
    messageEl.textContent = message;
    document.body.appendChild(messageEl);

    setTimeout(() => {
      messageEl.remove();
    }, duration);
  }
}