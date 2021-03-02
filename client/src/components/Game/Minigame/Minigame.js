import React from 'react';
import styled from 'styled-components';
import { useTime } from '../../../hooks/useTime';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMinigameRound } from '../../../actions';
import MinigameButton from './MinigameButton';
import Karmameter from './Karmameter';
import dialogueOptions from '../../../data/dialogueOptions.json';
// "Art"work imports
import interview from '../../../assets/promo_bg.png';
import bubbleTick from '../../../assets/bubble_tick.png';

function MinigamePrototype() {
  const dispatch = useDispatch();
  // Bring in player's karma and showmanship global state values:
  const karma = useSelector((state) => state.player.karma);
  const showmanship = useSelector((state) => state.player.showmanship);
  // Global game state also controls the minigame round (and starts at round 0):
  const minigameRound = useSelector((state) => state.game.minigameRound);
  const updateRound = useSelector((state) => state.game.newMinigameRound);
  // Rounds last 3 seconds by default:
  const ROUND_DURATION = 3;
  // Define max rounds to avoid an error when you run out of dialogue options:
  const MAX_ROUNDS = 5;
  // Trigger a re-render every 0.2 seconds:
  const now = useTime(200);
  // Tick off time:
  const [ticker, setTicker] = React.useState(0);
  // Buttons' values will be set initially as 1 and 2; these match the first 2 serial id's in the dialogue options dictionary.
  const [currentButtons, setCurrentButtons] = React.useState(0);
  // Button update handler function:
  const advanceRound = () => {
    // Remember to add whatever the number of buttons is to prevent duplicate calls from the dialogtionary.
    setCurrentButtons(currentButtons + 4);
    setTicker(0);
    // When this function runs it increments the minigame round, and sets the 'update minigame' flag to false:
    dispatch(setMinigameRound(minigameRound + 1, false));
  };
  // UseEffect is like the engine; advancing the ticker and updating the buttons each round:
  React.useEffect(() => {
    setTicker(ticker + 1);
    if (updateRound || ticker > (ROUND_DURATION * 15)) {
      if (minigameRound < MAX_ROUNDS) {
        advanceRound();
      } else {
        dispatch(setMinigameRound(0, false))
      }
    }
  }, [now]);
  return (
    <MinigameUI className={'MinigameUI'}>
      <TitleBanner>WORK IN PROGRESS - MINIGAME</TitleBanner>
      <FlexDiv>
        <ImageWrapper>
          <SpeechBubble>
            <p>Speech bubble!!</p>
            <img src={bubbleTick} style={{ transform: 'rotateY(180deg)', position: 'absolute', bottom: '-64px', left: '50px' }}/>
            <img src={bubbleTick} style={{ position: 'absolute', bottom: '-64px', right: '100px' }}/>
          </SpeechBubble>
          <img src={interview} style={{maxHeight: '100%', maxWidth: '100%', position: 'relative', bottom: '-4px'}}/>
        </ImageWrapper>
        <Karmameter
          karma={karma}
          showmanship={showmanship}
          ticker={ticker}
          minigameRound={minigameRound}
          ROUND_DURATION={ROUND_DURATION}
        />
      </FlexDiv>
      {minigameRound < MAX_ROUNDS &&
      <ButtonCluster className='button-cluster'>
        <MinigameButton
          buttonData={dialogueOptions[currentButtons]}
        ></MinigameButton>
        <MinigameButton
          buttonData={dialogueOptions[currentButtons + 1]}
        ></MinigameButton>
        <MinigameButton
          buttonData={dialogueOptions[currentButtons + 2]}
        ></MinigameButton>
        <MinigameButton
          buttonData={dialogueOptions[currentButtons + 3]}
        ></MinigameButton>
      </ButtonCluster>}
    </MinigameUI>
  );
}

const ImageWrapper = styled.div`
  width: 100%;
`

const FlexDiv = styled.div`
  display: flex;
`

const MinigameUI = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleBanner = styled.div`
  opacity: .65;
  margin-top: 12px;
  margin-left: 12px;
  display: flex;
  width: 100%;
`

const SpeechBubble = styled.div`
  border: 2px solid black;
  position: relative;
  height: 100px;
  border-left: none;
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`

const ButtonCluster = styled.div`
  display: flex;
  flex-direction: column;
  height: 175px;
  justify-content: space-between;
`

export default MinigamePrototype;
