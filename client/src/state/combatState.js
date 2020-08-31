import { atom } from 'recoil';

export const PLAYER_SKILLS = atom({
  key: 'playerSkills',
  default: [
    { name: 'slap', range: 1, pathing: 'radial' },
    { name: 'smack', range: 2, pathing: 'radial' },
    { name: 'shoot gun', range: 3, pathing: 'radial' },
    { name: 'slide', range: 4, pathing: 'radial' },
  ]
})

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