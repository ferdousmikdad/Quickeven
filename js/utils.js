import { SOUND_SETTINGS } from './config.js';

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}

export function getRandomVelocity(baseSpeed) {
  const angle = (Math.random() * Math.PI / 2) - Math.PI / 4; // -45 to 45 degrees
  return {
    x: Math.sin(angle) * baseSpeed,
    y: -Math.cos(angle) * baseSpeed
  };
}

export function formatScore(score) {
  return score.toString().padStart(6, '0');
}

export function playSound(soundPath, volume = 0.5) {
  if (!SOUND_SETTINGS.enabled) return;

  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch(e => console.log('Sound play failed:', e));
}

export function createElement(tag, className = '', innerHTML = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}