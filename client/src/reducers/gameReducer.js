// Game Reducer will be used to keep track of which scene/frame you're on in the overall script:

const initialState = {
  scene: 0,
  frame: 0,
  // Six possible combat phases: playerMove, playerAction, baddieMove, baddieAction, specialEvent and noCombat:
  combatPhase: 'noCombat',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_SCENE': {
      return {
        ...state,
        scene: action.scene,
        // when you go to a new scene reset the frame counter also:
        frame: 0,
      };
    }
    case 'SET_FRAME': {
      return {
        ...state,
        frame: action.frame,
      };
    }
    case 'SET_COMBAT_PHASE': {
      return {
        ...state,
        combatPhase: action.combatPhase,
      };
    }
    default: {
      return state;
    }
  }
}
