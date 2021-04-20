//what I'm trying to do here is pass the range, effect, position, and damage of each skill in an area

export const attackRange = (skill, PLAYER_POS, width, height, obstructions) => { // i need attack to return it's range, and then   
  let range = skill.range
  if(skill.shape === 'radial') { //checks skill pathing and calls pathing function
    return radialRange(range, PLAYER_POS, width, height, obstructions)
  }
}

//rangefinding functions

//radial rangefinding

const radialRange = (range, PLAYER_POS, width, height, obstructions) => { //maybe i can get this from a global state variable
  let solvedSpaces = [PLAYER_POS];
  let distanceCounter = 1;
  for(let i = range; i > 0; i -= 1) {
    solvedSpaces.forEach((node) => {
      const unsolvedSpaces = [
        { x: node.x - 1, y: node.y, distance: distanceCounter },
        { x: node.x + 1, y: node.y, distance: distanceCounter },
        { y: node.y - 1, x: node.x, distance: distanceCounter },
        { y: node.y + 1, x: node.x, distance: distanceCounter },
      ];
      unsolvedSpaces.forEach((space) => {
        if (
          space.x > 0 &&
          space.y > 0 &&
          space.x <= width &&
          space.y <= height &&
          !obstructions.find((obj) => obj.x === space.x && obj.y === space.y)
        ) {
          if (i === 0) {
            return;
          } else {
            if(solvedSpaces.find(obj => (obj.x === space.x && obj.y === space.y)) === undefined) {
              solvedSpaces.push(space);
            } else {
              return
            }
          }
        } else {
          return
        }
      })
    })
    distanceCounter += 1;
  }
  return solvedSpaces
}