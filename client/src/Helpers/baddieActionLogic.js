// This File contains functions for the automated control of baddie action functions:

// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has acted and then set state to the next phase of the combat cycle:
export const baddieActionLogic = (
  dispatch,
  setCombatPhase,
  baddiePosition,
  playerPosition
) => {
  console.log("I'm sorry Dave, I'm afraid I can't attack you right now.");
  console.log(
    `Baddie coords: (${baddiePosition.x}, ${baddiePosition.y}) - Player coords: (${playerPosition.x}, ${playerPosition.y})`
  );
  // Baddie acts... eventually.
  dispatch(setCombatPhase('specialEvent'));
};
