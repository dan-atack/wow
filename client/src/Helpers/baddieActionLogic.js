// This File contains functions for the automated control of baddie action functions:

import { cross } from '../components/Library/attackShapeLibrary'

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
export const baddieDecision = (baddiePosition, playerPosition, baddie) => {
  console.log('baddie decision phase');
  // ... For now it will simply randomly select an entry from the baddie's skills list, and pass that to the Combat Env:
  const choice = baddie.skills[Math.floor(Math.random() * baddie.skills.length)];
  console.log("Baddie: ", baddiePosition);
  console.log("Player: ", playerPosition);
  return choice;
};

export const baddieAction = (
  dispatch,
  setCombatPhase,
  baddiePosition,
  playerPosition,
  baddie,
  seed,
  enemyDecision,
  SET_ENEMY_ATTACK_RADIUS,
) => {

  // from here what i need to do is set up a state which is the attack
  // there will have to be a switch statement that literally holds the algorithms for every single move

  console.log('baddie does their action now')
  if(enemyDecision) {
    switch (enemyDecision.name) {
      case "Crisis of Faith": 
        //shape is a cross
        SET_ENEMY_ATTACK_RADIUS(cross(baddiePosition, seed))
  
        break;
      case "Stigmata":
        //shape is a cross
        SET_ENEMY_ATTACK_RADIUS(cross(baddiePosition, seed))
  
        break;
      case "Holy Man":
        //shape is a cross
        SET_ENEMY_ATTACK_RADIUS(cross(baddiePosition, seed))
  
        break;
      case  "Revelations" :
        //shape is a cross
        SET_ENEMY_ATTACK_RADIUS(cross(baddiePosition, seed))
        
        break;
      default:
        console.log('error', enemyDecision);
        break;
    }
  }

  dispatch(setCombatPhase('playerAction'))
}