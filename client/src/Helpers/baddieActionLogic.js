// This File contains functions for the automated control of baddie action functions:

import { setCombatPhase } from "../actions";

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has acted and then set state to the next phase of the combat cycle:
export const baddieDecision = (
  dispatch, 
  setCombatPhase, 
  baddiePosition,
  playerPosition, 
  baddie, 
  seed,
  setEnemyDecision,
  ) => {

  console.log('baddie decision phase')
  setEnemyDecision(baddie.skills[Math.floor(Math.random() * baddie.skills.length)])

  dispatch(setCombatPhase('playerMove'));
};

export const baddieAction = (
  dispatch,
  setCombatPhase,
  baddiePosition,
  playerPosition,
  baddie,
  seed,
  enemyDecision,
  SET_ENEMY_ATTACK_RADIUS
) => {

  // from here what i need to do is set up a state which is the attack
  // there will have to be a switch statement that literally holds the algorithms for every single move
  
  console.log('baddie does their action now')
  console.log(enemyDecision)

  switch (enemyDecision.name) {
    case "Crisis of Faith": 
      //shape is a cross

      break;
    case "Stigmata":
      //shape is a cross

      break;
    case "Holy Man":
      //shape is a cross

      break;
    case  "Revelations" :
      //shape is a cross

      break;
    default:
      console.log('error', enemyDecision);
      break;
  }

  dispatch(setCombatPhase('playerAction'))
}