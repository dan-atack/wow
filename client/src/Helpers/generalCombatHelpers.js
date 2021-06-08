// When either the player's attack throws a baddie, or the baddie's attack throws the player,
// find out if there's an obstacle in the path to the destination and return the closest possible coords:
export const determineObstacle = (distance, direction, victimCoords, obstructions) => {
    console.log(`distance: ${distance}`);
    console.log(`direction: ${direction}`);
    console.log(`victim coords: ${victimCoords.x}, ${victimCoords.y}`);
    console.log(obstructions);
    // For each cardinal direction, make a list of all the squares the victim will cross to travel the distance, in that direction:
    const potentialPositions = [];
    switch (direction) {
      case 'east':
        for (let i = 1; i <= distance; i++) {
          potentialPositions.push({
            x: victimCoords.x + i,
            y: victimCoords.y
          })
        }
        break;
      case 'west':
        for (let i = 1; i <= distance; i++) {
          potentialPositions.push({
            x: victimCoords.x - i,
            y: victimCoords.y
          })
        }
        break;
      case 'south':
        for (let i = 1; i <= distance; i++) {
          potentialPositions.push({
            x: victimCoords.x,
            y: victimCoords.y + i
          })
        }
        break;
      case 'north':
        for (let i = 1; i <= distance; i++) {
          potentialPositions.push({
            x: victimCoords.x ,
            y: victimCoords.y - i
          })
        }
      default:
        // Display message and return original coords if none of the above cases are called, but were supposed to:
        if (potentialPositions.length === 0 && distance > 0) {
          console.log('Unknown throw direction given for attack.');
          return victimCoords;
        }
    }
    // Next, find which obstacles are potentially in the way of the attack's throw, based on the target's original position:
    let possibleObstacles = [];
    switch (direction) {
      case 'east':
        // Look at all of the obstacles that are to your right, then see if you hit any of them:
        possibleObstacles = obstructions.filter((obstacle) => obstacle.x === victimCoords.x + 1);
        // Loop through the potential positions array to see if any of those spaces is obstructed:
        potentialPositions.forEach((position) => {
          possibleObstacles.forEach((obstacle) => {
            // If there is a match, return it right away:
            if (position.y === obstacle.y) return position;
          })
        })
        // If no obstacle is in the way, return the farthest destination (last item in potential positions list):
        return potentialPositions[potentialPositions.length - 1];
      case 'west':
        possibleObstacles = obstructions.filter((obstacle) => obstacle.x === victimCoords.x - 1);
        // Copy of original east case here:
        potentialPositions.forEach((position) => {
          possibleObstacles.forEach((obstacle) => {
            if (position.y === obstacle.y) return position;
          })
        })
        return potentialPositions[potentialPositions.length - 1];
      case 'south':
        possibleObstacles = obstructions.filter((obstacle) => obstacle.y === victimCoords.y + 1);
        // Analogue of east case, except that now we check the y values instead:
        potentialPositions.forEach((position) => {
          possibleObstacles.forEach((obstacle) => {
            if (position.x === obstacle.x) return position;
          })
        })
        return potentialPositions[potentialPositions.length - 1];
      case 'north':
        possibleObstacles = obstructions.filter((obstacle) => obstacle.y === victimCoords.y - 1);
        potentialPositions.forEach((position) => {
          possibleObstacles.forEach((obstacle) => {
            if (position.x === obstacle.x) return position;
          })
        })
        return potentialPositions[potentialPositions.length - 1];
        break;
      default:
        // Default should only occur in the event of some kind of failure in the execution of one of the above cases.
        return victimCoords;
    }
  }