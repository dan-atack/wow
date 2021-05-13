// This file contains the helper functions for things that happen on the player's attack phase.

// Given a particular move's area of effect and the player and baddie's coordinates, return true if the baddie is within range:
// range = number, playerCoords = {x: num, y:num}, baddieCoords = {x: num, y:num}
export const determineIfBaddieInRange = (range, playerCoords, baddieCoords) => {
  let inRange = false;
  // From the player's coords, create a list of all the tiles that are within range:
  let affectedAreas = [];
  for (let i = playerCoords.x - range; i <= playerCoords.x + range; i++) {
    for (let k = playerCoords.y - range; k <= playerCoords.y + range; k++) {
      const deltaX = Math.abs(playerCoords.x - i);
      const deltaY = Math.abs(playerCoords.y - k);
      if (deltaX + deltaY <= range) {
        affectedAreas.push({ x: i, y: k });
      }
    }
  }
  // Check each coordinate; if the baddie is in any of them return true:
  affectedAreas.forEach((coord) => {
    if (coord.x === baddieCoords.x && coord.y === baddieCoords.y) {
      inRange = true;
    }
  })
  return inRange;
};
