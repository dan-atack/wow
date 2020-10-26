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
import upperCorner from '../../../assets/minigame_corner.png';
import interview from '../../../assets/promo_bg.png';
import bubbleTick from '../../../assets/bubble_tick.png';

function MinigamePrototype() {
  const dispatch = useDispatch();
  // Bring in player's karma and showmanship global state values:
  const karma = useSelector((state) => state.player.karma);
  const showmanship = useSelector((state) => state.player.showmanship);
  // Global game state also controls the minigame round (and starts at round 0):
  const minigameRound = useSelector((state) => state.game.minigameRound);
  const newRound = useSelector((state) => state.game.newMinigameRound);
  // Rounds last 3 seconds by default:
  const ROUND_DURATION = 3;
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
    console.log('checking for new round')
    if (newRound || (ticker > (ROUND_DURATION * 15) && minigameRound < 4)) {
      advanceRound();
    }
  }, [now]);
  return (
    <MinigameUI className={'MinigameUI'}>
      <LeftFrame src={upperCorner}/>
      <TitleBanner>MINIGAME</TitleBanner>
      <RightFrame src={upperCorner}/>
      <SpeechBubble>
        <p>Speech bubble!!</p>
        <img src={bubbleTick} style={{ position: 'absolute', bottom: '-64px', left: '15%' }}/>
        <img src={bubbleTick} style={{ transform: 'rotateY(180deg)', position: 'absolute', bottom: '-64px' }}/>
      </SpeechBubble>
      <Karmameter
        karma={karma}
        showmanship={showmanship}
        style={{ gridArea: 'karma' }}
        ticker={ticker}
        minigameRound={minigameRound}
        ROUND_DURATION={ROUND_DURATION}
      ></Karmameter>
      <img src={interview} style={{gridArea: 'image', maxHeight: '100%', maxWidth: '100%'}}/>
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
      </ButtonCluster>
    </MinigameUI>
  );
}

const MinigameUI = styled.div`
  grid-area: ui;
  border: 3px solid black;
  border-radius: 8px;
  display: grid;
  grid-template-areas:
    'lfram title title rfram'
    'lfram bubbl karma rfram'
    'lfram bubbl karma rfram'
    'image image karma rfram'
    'image image optns optns'
    'image image optns optns';
  grid-template-rows: 2fr 2fr 1fr 2fr 2fr 1fr;
  grid-template-columns: 1fr 5fr 5fr 1fr;
  overflow: hidden;
`;

const TitleBanner = styled.h1`
  border: 2px solid goldenrod;
  border-radius: 14px;
  grid-area: title;
`

const SpeechBubble = styled.div`
  border: 2px solid black;
  border-radius: 24px;
  grid-area: bubbl;
  position: relative;
`

const ButtonCluster = styled.div`
  grid-area: optns;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border: 4px solid rgb(221, 171, 34);
  border-radius: 18px;
  background-color: rgb(53, 39, 2);
`

const LeftFrame = styled.img`
  grid-area: lfram;
`

const RightFrame = styled.img`
  grid-area: rfram;
  transform: rotateY(180deg);
  height: 50%;
`

export default MinigamePrototype;
