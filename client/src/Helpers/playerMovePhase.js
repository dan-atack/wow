// This file is the prototype 'Top level' function for handling the player's movement phase of their turn:
import { possiblePaths } from '../Helpers/playerMoveHelper';

export const setupPlayerMovePhase = (playerAP, playerCoords, level) => {
  return possiblePaths(playerAP, playerCoords, level);
};