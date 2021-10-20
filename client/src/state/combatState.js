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

export const playerAttacksInQueue = atom({
  key: 'playerMovesInQueue',
  default: [], // every move in the queue increases hype cost; list is reset each combat round.
})

export const playerHype = atom({
  key: 'playerHype',
  default: 0,
})

export const playerHealth = atom({
  key: 'playerHealth',
  default: 100,
})

export const playerCoords = atom({
  key: 'playerCoords',
  default: {x:6, y:1},
})

export const playerOrientation = atom({
  key: 'playerOrientation',
  default: 'south', //  options are 'north', 'south', 'east', 'west' for now... 45% angles tbd.
})

export const playerAttackRadius = atom({
  key: 'playerAttackRadius',
  default: [],
})

export const playerMoveOptions = atom({
  key: 'playerMoveOptions',
  default: [],
})

export const playerMovementDecision = atom({
  key: 'playerMovementDecision',
  default: {x:0, y:0},
})

export const playerIsDead = atom({
  key: 'playerIsDead',
  default: false,
})

export const playerStatus = atom({
  key: 'playerStatus',
  default: {
    physical: [],
    elemental: {},
    positional: {},
  }
})

export const playerAttackSelecting = atom({
  // Answers the question 'which part of their attack is the player configuring?'
  key: 'playerAttackSelecting',
  default: 'notSelecting' // Other EXPECTED values are: 'travelDestination', 'attackTarget', 'throwDestination' and 'selectingAttack' which represents the very start of the player action phase, as well as when the player has chosen to add an additional attack.
})

// Baddie-Related Variables:

export const baddieHP = atom({
  key: 'baddieHP',
  default: 100,
})

export const baddieCoords = atom({
  key: 'baddieCoords',
  default: { x: 6, y: 11 },
})

export const baddieOrientation = atom({
  key: 'baddieOrientation',
  default: 'north', //  options are 'north', 'south', 'east', 'west' for now... 45% angles tbd.
})

export const baddieDecision = atom({
  key: 'baddieDecision',
  default: {
      damage: 0,
      effect: '',
      name: '',
      shape: '',
      threshold: 0
  },
})

export const baddieStatus = atom({
  key: 'baddieStatus',
  default: {
    default: {
      physical: [],
      elemental: {},
      positional: {},
    }
  }
})

export const mapGrid = atom({
  key: 'mapGrid',
  default: [],
})