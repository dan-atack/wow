// This file is the prototype 'Top level' function for handling the player's movement phase of their turn:
import { possiblePaths } from '../Helpers/playerMoveHelper';

export const setupPlayerMovePhase = (
  movePoints,
  movePointsHandler,
  playerCoords,
  level
) => {
  possiblePaths(movePoints, movePointsHandler, playerCoords, level);
};

export const playerMove = (
  x,
  y,
  dispatch,
  setPlayerCoords,
  setCombatPhase,
  SET_PLAYER_MOVE_OPTIONS
) => {
  // setActionPoints(actionPoints - TotalDistance)
  dispatch(setPlayerCoords(x, y));
  SET_PLAYER_MOVE_OPTIONS([]);
  dispatch(setCombatPhase('playerAction'));
};
