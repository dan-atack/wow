// State for the Player lives here:

const initialState = {
  xPosition: 1,
  yPosition: 1,
  hype: 1000000,
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
    default: {
      return state;
    }
  }
}
