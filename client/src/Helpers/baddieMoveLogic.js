// This File contains functions for the automated control of baddie movement functions:

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has moved and then set state to the next phase of the combat cycle:
export const baddieMoveLogic = ( dispatch, setCombatPhase, baddiePosition, playerPosition ) => {
  // Array destructuring!!

  console.log(baddiePosition, 'badguy position')
  console.log(playerPosition, 'badguy position')

  // const [baddieX, baddieY] = baddiePosition;
  // const [playerX, playerY] = playerPosition;

  // console.log('open the pod bay doors HAL. (baddie movement turn commences');
  // // Baddie moves... eventually.
  dispatch(setCombatPhase('baddieAction'));
};