// This File contains functions for the automated control of baddie action functions:
import { setCombatPhase } from '../actions';
import { useDispatch } from 'react-redux';
// Future versions of this function will eventually produce something from the baddie and player's respective positions...
// For now we'll just print that the baddie has acted and then set state to the next phase of the combat cycle:
export const specialEventLogic = (fight_context) => {
  const dispatch = useDispatch();
  if (fight_context) {
      console.log('executing special event!!!')
  } else {
      console.log('No special event context this round.');
  }
  dispatch(setCombatPhase('playerMove'));
};
