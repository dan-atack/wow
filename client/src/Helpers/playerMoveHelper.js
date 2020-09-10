import data from '../data/mapSeed.json'

const movementFinder = (target, playerPOS) => {

  const movementX = playerPOS.x - target.x;
  const movementY = playerPOS.y - target.y;
  
  const movement = {x: movementX, y: movementY};
  return movement
} 

const timeOutCalculator = (movement) => {
  const {x, y} = movement;
  let totalTime = 0;
  let isTurn = false
  if(x && y) {
    totalTime += 50;
    isTurn = true
  }
  totalTime += ((Math.abs(x) * 50) + (Math.abs(y) * 50))
  const yTime = Math.abs(y) * 50;
  const xTime = Math.abs(x) * 50;
  return {totalTime: totalTime, xTime: xTime, yTime: yTime, isTurn: isTurn, movement: movement}
}

export const movementTimeout = (target, playerPOS) => { //player pos will likely be taken from a reducer
  const movement = movementFinder(target, playerPOS) // returns the movement instructions with the target location and the player position
  console.log(movement)
  const turnTime = timeOutCalculator(movement) // takes the movement instructions and returns the amount of time to time out for the animation

  return turnTime // returns the turn time :D
}

export const sleep = (duration) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, duration * 1000)
	})
}

export const possiblePaths = (actionPoints, SET_PLAYER_MOVES, PLAYER_POS, level) => { //function to show the web of movements a player can take on their turn
  SET_PLAYER_MOVES([]); //sets the populated array of moves to none
  const seed = data.find(obj => obj.level === level)
  let distanceCounter = 1;  // iterating counter to tell which iteration of the algorithm this possible move was generated on
  let moves = actionPoints; // indexing number for algorithm loop
  const possibleArray = [PLAYER_POS]; //djikstra's to solve spaces starting at PLAYER_POS
  for (let i = moves; i > 0; i -= 1) {
    possibleArray.forEach((node) => {
      const unsolvedSpaces = [
        { x: node.x - 1, y: node.y, distance: distanceCounter },
        { x: node.x + 1, y: node.y, distance: distanceCounter },
        { y: node.y - 1, x: node.x, distance: distanceCounter },
        { y: node.y + 1, x: node.x, distance: distanceCounter },
      ];
      unsolvedSpaces.forEach((move) => {
        if (
          move.x > 0 &&
          move.y > 0 &&
          move.x <= seed.width &&
          move.y <= seed.height &&
          !seed.obstructions.find((obj) => obj.x === move.x && obj.y === move.y)
        ) {
          if (i === 0) {
            return;
          } else {
            if(possibleArray.find(obj => (obj.x === move.x && obj.y === move.y)) === undefined) {
              possibleArray.push(move)
            } else {
              return
            }
          }
        } else {
          return;
        }
      });
    });
    distanceCounter += 1;
  }
  SET_PLAYER_MOVES(possibleArray);
}

export const pathfinder = (target, PLAYER_MOVES) => { // takes target location and extrapolates a path backwards
  let endpoint = PLAYER_MOVES.find(obj => obj.x === target.x && obj.y === target.y);
  console.log(endpoint, 'endpoint')
  let previousSquare = endpoint
  const pathArray = [endpoint]
  console.log(PLAYER_MOVES, 'player moves')
  for(let i = endpoint.distance - 1; i > 0; i -= 1) {
    const tempPath = PLAYER_MOVES.find(obj => 
      (obj.distance === i && obj.x === previousSquare.x - 1 && obj.y === previousSquare.y) ||
      (obj.distance === i && obj.x === previousSquare.x + 1 && obj.y === previousSquare.y) ||
      (obj.distance === i && obj.y === previousSquare.y + 1 && obj.x === previousSquare.x) ||
      (obj.distance === i && obj.y === previousSquare.y - 1 && obj.x === previousSquare.x)
    )
    pathArray.push(tempPath);
    previousSquare = tempPath;
  }
  return pathArray.sort((a,b) => {
    return a.distance - b.distance;
  })
}