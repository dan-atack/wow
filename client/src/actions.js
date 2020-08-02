// State-Control Actions List:

// Player State Actions:
export const selectCharacterType = (characterType) => ({
  type: 'SELECT_CHARACTER_TYPE',
  characterType,
});

export const setPlayerCoords = (x, y) => ({
  type: 'SET_PLAYER_COORDS',
  x,
  y,
});

export const setPlayerDamage = (val) => ({
  type: 'SET_PLAYER_DAMAGE',
  val,
});
export const setPlayerEndurance = (val) => ({
  type: 'SET_PLAYER_ENDURANCE',
  val,
});
export const setPlayerAcrobatics = (val) => ({
  type: 'SET_PLAYER_ACROBATICS',
  val,
});
export const setPlayerItemSkill = (val) => ({
  type: 'SET_PLAYER_ITEM_SKILL',
  val,
});

export const setPlayerStats = (dmg, end, acr, itm) => ({
  type: 'SET_PLAYER_STATS',
  dmg,
  end,
  acr,
  itm,
});

export const addToPlayerMovesList = (move) => ({
  type: 'ADD_TO_PLAYER_MOVES_LIST',
  move,
});

// Game Script Scene-Advancing Actions:
export const setScene = (scene) => ({
  type: 'SET_SCENE',
  scene,
});

export const setFrame = (frame) => ({
  type: 'SET_FRAME',
  frame,
});
