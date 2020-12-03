// Game Reducer will be used to keep track of which scene/frame you're on in the overall script:

const initialState = {
  // For cutscenes:
  scene: 0,
  frame: 0,
  // Which minigame round is it?
  minigameRound: 0,
  // This momentarily lights up true when a button is pressed, to tell the minigame component to refresh the button options:
  newMinigameRound: false,
  // Six possible combat phases: playerMove, playerAction, baddieMove, baddieAction, specialEvent and noCombat:
  combatPhase: 'noCombat',
  // Whether or not there is a reflex check (independent of which phase it is, but in state because... just because!)
  reflexCheck: false,
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
    case 'SET_MINIGAME_ROUND': {
      return {
        ...state,
        minigameRound: action.round,
        newMinigameRound: action.needUpdate,
      };
    }
    case 'SET_COMBAT_PHASE': {
      return {
        ...state,
        combatPhase: action.combatPhase,
      };
    }
    case 'START_REFLEX_CHECK': {
      return {
        ...state,
        reflexCheck: true,
      };
    }
    case 'STOP_REFLEX_CHECK': {
      return {
        ...state,
        reflexCheck: false,
      };
    }
    default: {
      return state;
    }
  }
}
