import {
  playerAP,
  playerAttacksInQueue,
  playerAttackRadius,
  playerCoords,
  playerOrientation,
  playerHealth,
  playerHype,
  playerIsDead,
  playerMoveOptions,
  playerMovementDecision,
  playerSkills,
  playerStatus,
  mapGrid,
  baddieHP,
  baddieCoords,
  baddieOrientation,
  baddieDecision,
  baddieStatus
} from './combatState';

import {
  characterSheet,
} from './characterState';

import {
  level,
  scene,
  frame,
} from './globalState';

import {
  karma,
  showmanship,
  minigameRound,
  updateRound,
  currentRound,
} from './minigameState'

export default {
  playerAP,
  playerAttacksInQueue,
  playerAttackRadius,
  playerCoords,
  playerOrientation,
  playerHealth,
  playerHype,
  playerIsDead,
  playerMoveOptions,
  playerMovementDecision,
  playerSkills,
  playerStatus,
  mapGrid,
  baddieHP,
  baddieCoords,
  baddieOrientation,
  baddieDecision,
  level,
  baddieStatus,
  characterSheet,
  scene,
  frame,
  karma,
  showmanship,
  minigameRound,
  updateRound,
  currentRound
}