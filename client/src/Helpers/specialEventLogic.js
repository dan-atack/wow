// This File contains functions for the automated control of baddie action functions:

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has acted and then set state to the next phase of the combat cycle:
export const specialEventLogic = (setCombatPhase, fight_context, advanceCombatSequence) => {
  if (fight_context) {
    // console.log('end of combat round');
  } else {
    // console.log('end of combat round - no special event context this round.');
  }
  advanceCombatSequence(1000, 'baddieMove', setCombatPhase);
};
