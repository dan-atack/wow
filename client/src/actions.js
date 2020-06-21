// State-Control Actions List:

export const selectCharacterType = (characterType) => ({
  type: 'SELECT_CHARACTER_TYPE',
  characterType,
});

export const setPlayerCoords = (x, y) => ({
  type: 'SET_PLAYER_COORDS',
  x,
  y,
});

export const setScene = (scene) => ({
  type: 'SET_SCENE',
  scene,
});

export const setFrame = (frame) => ({
  type: 'SET_FRAME',
  frame,
});
