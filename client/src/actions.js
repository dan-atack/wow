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

export const setCombatPhase = (combatPhase) => ({
  type: 'SET_COMBAT_PHASE',
  combatPhase,
});

export const startReflexCheck = () => ({
  type: 'START_REFLEX_CHECK',
});

export const stopReflexCheck = () => ({
  type: 'STOP_REFLEX_CHECK',
});

// Minigame actions:

export const setMinigameRound = (round, needUpdate) => ({
  type: 'SET_MINIGAME_ROUND',
  round,
  needUpdate,   // boolean: true if it comes from a button, false if it's from the minigame component itself.
});

export const setMinigameRoundFromButton = () => ({
  type: 'BUTTON_ADVANCE_MINIGAME',
});

export const setKarma = (karmicAdjustment) => ({
  type: 'SET_KARMA',
  karmicAdjustment,
});

export const setShowmanship = (showmanshipAdjustment) => ({
  type: 'SET_SHOWMANSHIP',
  showmanshipAdjustment,
});
