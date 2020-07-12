// State for the Player lives here:
import produce from 'immer';

const initialState = {
  // we can use these coordinates for fighting!
  xPosition: 1,
  yPosition: 1,
  // hype might not be needed always, but we'll keep track of it here for now:
  hype: 100,
  health: 100,
  // You'll select your character type at the game's outset:
  characterType: null,
  playerStr: 0,
  playerEnd: 0,
  playerAcr: 0,
  playerItm: 0,
  playerMoves: [],
  // Player status will change from 'confirmed' to 'unconfirmed' (and then back again) whenever a new set of choices has to be made:
  playerStatus: 'unconfirmed',
  karma: 0,
  karmicAlignmentLocked: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_PLAYER_COORDS': {
      return {
        ...state,
        xPosition: action.x,
        yPosition: action.y,
      };
    }
    case 'SELECT_CHARACTER_TYPE': {
      return {
        ...state,
        characterType: action.characterType,
      };
    }
    case 'SET_PLAYER_STRENGTH': {
      return {
        ...state,
        playerStr: action.val,
      };
    }
    case 'SET_PLAYER_ENDURANCE': {
      return {
        ...state,
        playerEnd: action.val,
      };
    }
    case 'SET_PLAYER_ACROBATICS': {
      return {
        ...state,
        playerAcr: action.val,
      };
    }
    case 'SET_PLAYER_ITEM_SKILL': {
      return {
        ...state,
        playerItm: action.val,
      };
    }
    default: {
      return state;
    }
  }
}
