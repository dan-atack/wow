// This File contains functions for the automated control of baddie movement functions:
import { setCombatPhase } from '../actions';
import { useDispatch } from 'react-redux';
// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has moved and then set state to the next phase of the combat cycle:
export const baddieMoveLogic = (baddiePosition, playerPosition) => {
  const dispatch = useDispatch();
  // Array destructuring!!
  const [baddieX, baddieY] = baddiePosition;
  const [playerX, playerY] = playerPosition;

  console.log('open the pod bay doors HAL.');
  // Baddie moves... eventually.
  dispatch(setCombatPhase('baddieAction'));
};
