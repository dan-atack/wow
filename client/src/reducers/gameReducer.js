// Game Reducer will be used to keep track of which scene/frame you're on in the overall script:

const initialState = {
  // For cutscenes:
  scene: 0,
  frame: 0,
  // Which minigame round is it?
  minigameRound: 0,
  // This momentarily lights up true when a button is pressed, to tell the minigame component to refresh the button options:
  newMinigameRound: false,
  // Eight possible combat phases: playerMove, playerAction, baddieMove, baddieAction, specialEvent, noCombat, gameOver and victory:
  combatPhase: 'noCombat',
  // Reflex check will be either zero, OR the ID number of one of the playerMoves:
  reflexCheck: 0,
  // Separate the ID of the reflex check from the cue to start it:
  doReflexCheck: false,
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
    case 'SET_REFLEX_CHECK': {
      return {
        ...state,
        reflexCheck: action.reflexCheckId,
      };
    }
    case 'START_REFLEX_CHECK': {
      return {
        ...state,
        doReflexCheck: true,
      }
    }
    case 'STOP_REFLEX_CHECK': {
      return {
        ...state,
        reflexCheck: 0,
        doReflexCheck: false,
      };
    }
    default: {
      return state;
    }
  }
}
