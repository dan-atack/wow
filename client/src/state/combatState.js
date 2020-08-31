import { atom } from 'recoil';

export const ACTION_POINTS = atom({
  key: 'actionPoints',
  default: 4,
})

export const hype = atom({
  key: 'hype',
  default: 100,
})

export const health = atom({
  key: 'health',
  default: 100,
})

export const ATTACK_RADIUS = atom({
  key: 'attackRadius',
  default: [],
})

export const PLAYER_MOVE_OPTIONS = atom({
  key: 'playerMoveOptions',
  default: [],
})

export const PLAYER_POS = atom({
  key: 'playerPosition',
  default: {x:5, y:1},
})

export const mapGrid = atom({
  key: 'mapGrid',
  default: [],
})