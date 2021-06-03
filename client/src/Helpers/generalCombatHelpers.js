// When either the player's attack throws a baddie, or the baddie's attack throws the player,
// find out if there's an obstacle in the path to the destination and return the closest possible coords:
export const determineObstacle = (distance, direction, victimCoords, obstructions) => {
    console.log(`distance: ${distance}`);
    console.log(`direction: ${direction}`);
    console.log(`victim coords: ${victimCoords.x}, ${victimCoords.y}`);
    console.log(obstructions);
    // Make a list of all the squares the victim will cross to travel the distance, in the direction:
    const potentialPositions = [];
    switch (direction) {
      case 'east':
        // 
    }
  }