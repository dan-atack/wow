// This File contains functions for the automated control of baddie action functions:

import { cross } from '../components/Library/attackShapeLibrary'

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
export const baddieMakeDecision = (baddieCoords, baddieOrientation, playerCoords, playerOrientation, baddie) => {
  // Baddie must be 'aware' of their own position/orientation as well as the player's:
  // console.log(`baddie: ${baddieCoords.x}, ${baddieCoords.y} facing ${baddieOrientation}`);
  // console.log(`player: ${playerCoords.x}, ${playerCoords.y} facing ${playerOrientation}`);
  // ... For now it will simply randomly select an entry from the baddie's skills list, and pass that to the Combat Env:
  const choice = baddie.skills[Math.floor(Math.random() * baddie.skills.length)];
  return choice;
};

export const baddieAction = (baddieCoords, seed, baddieDecision) => {
  if(baddieDecision) {
    switch (baddieDecision.name) {
      case "Crisis of Faith": 
        //shape is a cross
        return cross(baddieCoords, seed);
      case "Stigmata":
        //shape is a cross
        return cross(baddieCoords, seed);
      case "Holy Man":
        //shape is a cross
        return cross(baddieCoords, seed);
      case  "Revelations" :
        // they're all crosses! get it? ahahahaha
        return cross(baddieCoords, seed);
      default:
        // console.log('error', baddieDecision);
        break;
    }
  }
}