// This file is the prototype 'Top level' function for handling the player's action phase of their turn:

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has moved and then set state to the next phase of the combat cycle:
export const playerActionPhase = (dispatch, setCombatPhase) => {
  // console.log(
  //   'Fwiiiishshhsh! What was THAT? That was your move phase bro. Gotta be quicker broh.'
  // );
  // The rest of the player move functions go here, and maybe get called some day. If they're lucky.
  // Then when the phase is completed we call the dispatcher to move to the next phase:
  dispatch(setCombatPhase('playerAction'));
};
