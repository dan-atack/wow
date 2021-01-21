import { atom } from 'recoil';
import moveCombos from '../data/playerMoves.json';

// Player-Related Variables:
export const playerSkills = atom({
  key: 'playerSkills',
  default: moveCombos,
})

export const playerAP = atom({
  key: 'playerAP',
  default: 4,
})

export const playerHype = atom({
  key: 'playerHype',
  default: 100,
})

export const playerHealth = atom({
  key: 'playerHealth',
  default: 100,
})

export const playerCoords = atom({
  key: 'playerCoords',
  default: {x:5, y:1},
})

export const ATTACK_RADIUS = atom({
  key: 'attackRadius',
  default: [],
})

export const PLAYER_MOVE_OPTIONS = atom({
  key: 'playerMoveOptions',
  default: [],
})

// Baddie-Related Variables:

export const baddieHP = atom({
  key: 'baddieHP',
  default: 100,
})

export const baddieCoords = atom({
  key: 'baddieCoords',
  default: { x: 5, y: 10 },
})

export const baddieAttack = atom({
  key: 'enemyDecision',
  default: {
    decision: {
      damage: 0,
      effect: '',
      name: '',
      shape: '',
      threshold: 0
    },
    isHit: false,
  },
})

export const mapGrid = atom({
  key: 'mapGrid',
  default: [],
})