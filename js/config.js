// Game configuration and constants
export const GAME_CONFIG = {
  paddle: {
    width: 100,
    height: 15,
    speed: 8,
    color: '#000000'
  },
  ball: {
    radius: 16, // Larger for the 32px icon
    speed: 4,
    mobileSpeed: 2.5, // Slower speed for mobile devices
    color: '#000000',
    size: 32, // Icon size in pixels
    mobileSize: 24 // Icon size for mobile
  },
  block: {
    padding: 12,
    borderRadius: 4,
    colors: {
      h1: '#000000',
      p: '#333333',
      h1_damaged: '#666666'
    }
  },
  game: {
    gravity: 0,
    friction: 2.0, // No friction to maintain speed
    bounceDecay: 2.0, // No bounce decay to maintain speed
    minSpeed: 6, // Minimum speed to prevent ball from slowing down
    mobileMinSpeed: 4, // Minimum speed for mobile
    maxSpeed: 16, // Maximum speed (increased for difficulty)
    mobileMaxSpeed: 10, // Maximum speed for mobile
    acceleration: {
      enabled: true,
      speedIncrease: 0.05, // Speed increase per block broken
      mobileSpeedIncrease: 0.03, // Slower acceleration for mobile
      intervalIncrease: 0.01, // Speed increase per second
      mobileIntervalIncrease: 0.006, // Slower time-based acceleration for mobile
      baseSpeed: 4, // Starting speed
      maxMultiplier: 3.0, // Maximum speed multiplier (3x base speed)
      mobileMaxMultiplier: 2.2 // Lower max multiplier for mobile
    }
  }
};

export const SOUND_SETTINGS = {
  enabled: true,
  volume: 0.5
};

export const GAME_STATE = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'game_over',
  WIN: 'win'
};