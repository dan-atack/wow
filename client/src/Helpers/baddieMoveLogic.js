// This File contains functions for the automated control of baddie movement functions:

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has moved and then set state to the next phase of the combat cycle:
export const baddieMoveLogic = ( dispatch, setCombatPhase, baddiePosition, setBaddiePosition, playerPosition, baddie, seed, data ) => {
  // Array destructuring!!

  console.log(baddiePosition, 'badguy position')
  console.log(playerPosition, 'badguy position')  

  const orientation = orientationFinder(baddiePosition, playerPosition)
  const possibleArray = possibleEnemyPaths(baddie, baddiePosition, seed)
  console.log(orientation); 
  console.log(possibleArray)

  const moves = moveFinder(baddiePosition, baddie, seed, orientation, possibleArray)
  const randomMove = moves[Math.floor(Math.random() * moves.length)]
  console.log(randomMove)

  setBaddiePosition({x: baddiePosition.x + randomMove.x, y: baddiePosition.y + randomMove.y})
  // now that we have the orientation, we find all the moves that would correspond to the cardinal directions
  // then while we're finding each individual move, we'll test the move to make sure the end point does not go out of bounds or
  // does not intersect with an obstruction.
  // we find all the positions that the bad guy might move towards taking into account their range


  // const [baddieX, baddieY] = baddiePosition;
  // const [playerX, playerY] = playerPosition;

  // console.log('open the pod bay doors HAL. (baddie movement turn commences');
  // // Baddie moves... eventually.
  dispatch(setCombatPhase('baddieAction'));
};

const moveFinder = (baddiePosition, baddie, seed, orientation, possibleArray) => {
  let possibleMoves = []
  orientation.forEach((direction) => {
    baddie.movement.forEach(move => {
      move.orientation.forEach(obj => {
        if (obj === direction) {
          // i need to make sure that the position that this move leads 
          // the baddie into, will not put it out of the screen or on an obstruction
          possibleMoves.push(move)
        }
      })
    })
  })
  possibleMoves.forEach((move, index) =>{ /// what I'm doing here is if the temp endpoint is greater or less than the map, the move is impossible, then we remove it from the array
    let tempEndpointX = baddiePosition.x + move.x 
    let tempEndpointY = baddiePosition.y + move.y 
    console.log(tempEndpointX, tempEndpointY, 'tempEndpoints')

    if (
      (tempEndpointX > seed.width || tempEndpointX <= 0) ||
      (tempEndpointY > seed.height || tempEndpointY <= 0)
    ) {
      possibleMoves.splice(1, index);
    }

    seed.obstructions.forEach(obst => {
      if(obst.x === tempEndpointX && obst.y === tempEndpointY) {
        possibleMoves.splice(1, index)
      }
    })
  })
   // I also need to check that the potential move is within the possibleMovesArray
  // console.log(possibleMoves)
  // console.log(possibleArray)
  // console.log(baddiePosition)

  return moveChecker(possibleMoves, possibleArray, baddiePosition);
}

const moveChecker = (possibleMoves, possibleArray, baddiePosition) => { //need to check my possibleMoves with baddie position
  possibleMoves.forEach((move, index) => {
    let tempEndpoint = {x:baddiePosition.x - move.x, y:baddiePosition.y - move.y}
    if(!possibleArray.find(obj => obj.x === tempEndpoint.x && obj.y === tempEndpoint.y)) {
      possibleMoves.splice(1, index)
    }
  })
  return possibleMoves
}

const orientationFinder = (baddiePosition, playerPosition) => {
  let orientationX = playerPosition.x - baddiePosition.x;
  let orientationY = playerPosition.y - baddiePosition.y;

  const orientation = [];

  console.log('x: ', orientationX, 'y: ', orientationY)

  let values = {x : (playerPosition.x - baddiePosition.x), y: (playerPosition.y - baddiePosition.y)}
  console.log(values.x, values.y)
  console.log(values.x > 0)
  switch (values.x > 0) { //show you the orientation of the directions that the baddie will go on the x axis
    case true: {
      orientation.push('east')
    }
    break;
    case false: {
      if(values.x < 0) {
        orientation.push('west')
      } else {
        break
      }
    }
    break;
  }

  switch (values.y > 0) {
    case true: {
      orientation.push('north')
    }
    break;
    
    case false: {
      if(values.y < 0) {
        orientation.push('south')
      } else {
        break
      }
    }
  
    default:
      break;
  }
  return orientation
}

const possibleEnemyPaths = (baddie, baddiePosition, seed) => {
  let moves = baddie.actionPoints; // indexing number for algorithm loop
  const possibleArray = [baddiePosition]; //djikstra's to solve spaces starting at PLAYER_POS
  for (let i = moves; i > 0; i -= 1) {
    possibleArray.forEach((node) => {
      const unsolvedSpaces = [
        { x: node.x - 1, y: node.y },
        { x: node.x + 1, y: node.y },
        { y: node.y - 1, x: node.x },
        { y: node.y + 1, x: node.x },
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
  }
  return possibleArray
}