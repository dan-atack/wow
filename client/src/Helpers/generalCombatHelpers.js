// When either the player's attack throws a baddie, or the baddie's attack throws the player,
// find out if there's an obstacle in the path to the destination and return the closest possible coords:
export const determineObstacle = (distance, direction, victimCoords, seed) => {
    console.log(`distance: ${distance}`);
    console.log(`direction: ${direction}, ${typeof direction}`);
    console.log(`victim coords: ${victimCoords.x}, ${victimCoords.y}`);
    // Return the location the victim is currently standing in if there is no distance to be thrown:
    if (distance === 0) return victimCoords;
    // For each cardinal direction, make a list of all the squares the victim will cross to travel the distance, in that direction:
    const potentialPositions = [];
    switch (direction) {
      case 'east':
        for (let i = 1; i <= distance; i++) {
          // Only add positions inside the map's boundaries to the PP list:
          if (victimCoords.x + i <= seed.width) {
            potentialPositions.push({
              x: victimCoords.x + i,
              y: victimCoords.y
            })
          }
        }
        break;
      case 'west':
        for (let i = 1; i <= distance; i++) {
          if (victimCoords.x - i > 0) {
            potentialPositions.push({
              x: victimCoords.x - i,
              y: victimCoords.y
            })
          }
        }
        break;
      case 'south':
        for (let i = 1; i <= distance; i++) {
          if (victimCoords.y + 1 < seed.height) {
            potentialPositions.push({
              x: victimCoords.x,
              y: victimCoords.y + i
            })
          }
        }
        break;
      case 'north':
        for (let i = 1; i <= distance; i++) {
          if (victimCoords.y - 1 > 0) {
            potentialPositions.push({
              x: victimCoords.x ,
              y: victimCoords.y - i
            })
          }
        }
      default:
        // Display message and return original coords if none of the above cases are called, but were supposed to:
        if (potentialPositions.length === 0 && distance > 0) {
          console.log(`Unexpected value given for attack throw direction: ${direction}`);
          return victimCoords;
        }
    }
    // Next, find which obstacles are potentially in the way of the attack's throw, based on the target's original position:
    let possibleObstacles = [];
    switch (direction) {
      case 'east':
        // Look at all of the obstacles that are to your right, then see if you hit any of them:
        possibleObstacles = seed.obstructions.filter((obstacle) => obstacle.x > victimCoords.x);
        console.log(possibleObstacles);
        // Loop through the potential positions array to see if any of those spaces is obstructed:
        for (const position of potentialPositions) {
          for (const obstacle of possibleObstacles) {
            if (position.x === obstacle.x && position.y === obstacle.y) {
              console.log("HIT!");
              console.log(position);
              return { x: position.x - 1, y: victimCoords.y};
            }
          }
        }
        // If no obstacle is in the way, return the farthest destination (last item in potential positions list):
        return potentialPositions[potentialPositions.length - 1];
      case 'west':
        possibleObstacles = seed.obstructions.filter((obstacle) => obstacle.x < victimCoords.x);
        console.log(possibleObstacles);
        for (const position of potentialPositions) {
          for (const obstacle of possibleObstacles) {
            if (position.x === obstacle.x && position.y === obstacle.y) {
              console.log("HIT!");
              console.log(position);
              return { x: position.x + 1, y: victimCoords.y};
            }
          }
        }
        return potentialPositions[potentialPositions.length - 1];
      case 'south':
        possibleObstacles = seed.obstructions.filter((obstacle) => obstacle.y > victimCoords.y);
        console.log(possibleObstacles);
        // Analogue of east case, except that now we get all of the y values that are greater (further south) than you:
        console.log(potentialPositions);
        for (const position of potentialPositions) {
          for (const obstacle of possibleObstacles) {
            if (position.x === obstacle.x && position.y === obstacle.y) {
              console.log("HIT!");
              console.log(position);
              return { x: victimCoords.x, y: position.y  - 1};
            }
          }
        }
        return potentialPositions[potentialPositions.length - 1];
      case 'north':
        possibleObstacles = seed.obstructions.filter((obstacle) => obstacle.y < victimCoords.y);
        console.log(possibleObstacles);
        console.log(potentialPositions);
        for (const position of potentialPositions) {
          for (const obstacle of possibleObstacles) {
            if (position.x === obstacle.x && position.y === obstacle.y) {
              console.log("HIT!");
              console.log(position);
              return { x: victimCoords.x, y: position.y + 1};
            }
          }
        }
        // If none of the potential positions collide with an obstacle, return the farthest one:
        return potentialPositions[potentialPositions.length - 1];
      default:
        // Default should only occur in the event of some kind of failure in the execution of one of the above cases.
        return victimCoords;
    }
  }