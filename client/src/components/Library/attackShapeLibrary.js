import react from 'react';

export const cross = (baddiePosition, seed) => {
  const range = [];

  // take the baddie position, then i take the limits of the map, then i fill it inbetween

  //x range finder
  for(let i = 1; i <= seed.width; i++) {
    range.push({x: i, y: baddiePosition.y})
  }

  for(let i = 1; i <= seed.height; i++) {
    range.push({y: i, x: baddiePosition.x})
  }

  return(range);
}