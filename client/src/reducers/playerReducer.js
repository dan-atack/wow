// State for the Player lives here:
import produce from 'immer';
import { HighFlier, Tank, SuperStar } from './characterDictionary';

const characters = {
  highFlier: HighFlier,
  tank: Tank,
  superStar: SuperStar,
};

const initialState = {
  // You'll select your character type at the game's outset:
  characterType: null,
  playerDmg: 0,
  playerEnd: 0,
  playerAcr: 0,
  playerItm: 0,
  playerMoves: [],
  // Player status will change from 'confirmed' to 'unconfirmed' (and then back again) whenever a new set of choices has to be made:
  playerStatus: 'unconfirmed',
  karma: 0,
  showmanship: 0,
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
      // Before doing anything else, determine if this is the first character type:
      if (state.characterType) {
        // if character type has already been selected, remove the stat points associated with it before updating to the new selection:
        return produce(state, (draftState) => {
          draftState.playerDmg -= characters[state.characterType]['damage'];
          draftState.playerEnd -= characters[state.characterType]['endurance'];
          draftState.playerAcr -= characters[state.characterType]['acrobatics'];
          draftState.playerItm -= characters[state.characterType]['items'];
          // And remove any special moves ASSOCIATED WITH the player type:
          draftState.playerMoves.filter(
            (move) => move != characters[state.characterType]['moveList'][0]
          );
          // THEN add the new values:
          draftState.playerDmg += characters[action.characterType]['damage'];
          draftState.playerEnd += characters[action.characterType]['endurance'];
          draftState.playerAcr +=
            characters[action.characterType]['acrobatics'];
          draftState.playerItm += characters[action.characterType]['items'];
          // And lastly, add the special move for the newly chosen character type:
          draftState.playerMoves.push(
            characters[action.characterType]['moveList'][0]
          );
          draftState.characterType = action.characterType;
        });
        // If this is the first character selection, simply add everything from that character type:
      } else {
        return {
          ...state,
          // Set the characterType value to the chosen type:
          characterType: action.characterType,
          // Then add the pre-set values for that character type:
          playerDmg: characters[action.characterType]['damage'],
          playerEnd: characters[action.characterType]['endurance'],
          playerAcr: characters[action.characterType]['acrobatics'],
          playerItm: characters[action.characterType]['items'],
          playerMoves: characters[action.characterType]['moveList'],
        };
      }
    }
    case 'SET_PLAYER_DAMAGE': {
      return {
        ...state,
        playerDmg: action.val,
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
    case 'SET_PLAYER_STATS': {
      return produce(state, (draftState) => {
        draftState.playerDmg += action.dmg;
        draftState.playerEnd += action.end;
        draftState.playerAcr += action.acr;
        draftState.playerItm += action.itm;
      });
    }
    case 'SET_KARMA': {
      return produce(state, (draftState) => {
        draftState.karma += action.karmicAdjustment;
      });
    }
    case 'SET_SHOWMANSHIP': {
      return produce(state, (draftState) => {
        draftState.showmanship += action.showmanshipAdjustment;
      });
    }
    default: {
      return state;
    }
  }
}
