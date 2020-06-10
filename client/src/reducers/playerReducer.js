// State for the Player lives here:

const initialState = {
  // we can use these coordinates for fighting!
  xPosition: 1,
  yPosition: 1,
  // hype might not be needed always, but we'll keep track of it here for now:
  hype: 100,
  health: 100,
  // You'll select your character type at the game's outset:
  characterType: null,
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
    default: {
      return state;
    }
  }
}
