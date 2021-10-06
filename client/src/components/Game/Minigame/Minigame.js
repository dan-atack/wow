import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useTime } from '../../../hooks/useTime';
import MinigameButton from './MinigameButton';
import Karmameter from './Karmameter';
import dialogueOptions from '../../../data/dialogueOptions.json';
// "Art"work imports:
import interview from '../../../assets/promo_bg.png';
import bubbleTick from '../../../assets/bubble_tick.png';

import minigameState from '../../../state'
import { useRecoilState } from 'recoil';

function MinigamePrototype({scene, setScene}) {
  // Bring in player's karma and showmanship global state values:
  const [karma, setKarma] = useRecoilState(minigameState.karma);
  const [showmanship, setShowmanship] = useRecoilState(minigameState.showmanship)

  // Global game state also controls the minigame round (and starts at round 0):
  const [minigameRound, setMinigameRound] = useRecoilState(minigameState.minigameRound)
  const [updateRound, setUpdateRound] = useRecoilState(minigameState.updateRound)

  // Rounds last 3 seconds by default:
  const ROUND_DURATION = 3;
  // Define max rounds to avoid an error when you run out of dialogue options:
  const MAX_ROUNDS = 5;
  // Trigger a re-render every 0.2 seconds:
  const now = useTime(200);
  // Tick off time:
  const [ticker, setTicker] = useState(0);
  // Buttons' values will be set initially as 1 and 2; these match the first 2 serial id's in the dialogue options dictionary.
  const [currentButtons, setCurrentButtons] = useState(0);
  // Track if the game is still going on:
  const [gameover, setGameover] = useState(false);
  // Button update handler function:
  const advanceRound = () => {
    // Remember to add whatever the number of buttons is to prevent duplicate calls from the dialogtionary.
    setCurrentButtons(currentButtons + 4);
    setTicker(0);
    // When this function runs it increments the minigame round, and sets the 'update minigame' flag to false:
    setMinigameRound(minigameRound + 1);
    setUpdateRound(false);
  };

  const handleGameOver = () => {
    setMinigameRound(0);
    setUpdateRound(false);
    setScene(scene + 1);
  }
  // UseEffect is like the engine; advancing the ticker and updating the buttons each round:
  useEffect(() => {
    setTicker(ticker + 1);
    if (updateRound || ticker > (ROUND_DURATION * 15)) {
      if (!gameover && minigameRound < MAX_ROUNDS) {
        advanceRound();
      } else {
        // Game Over button does this dispatch and advances the scene:
        setGameover(true);
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
      {gameover ?
      <GameoverWrapper>
        <GameoverButton onClick={handleGameOver}>
          NEXT SCENE
        </GameoverButton>
      </GameoverWrapper> :
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

const GameoverButton = styled.button`
    color: white;
    background-color: #A93355;
    font-size: 24px;
    height: 200px;
    width: 500px;
    border: 2px solid black;
    border-radius: 16px;
`;

const GameoverWrapper = styled.div`
    position: absolute;
    z-index: 100;
    left: 0px;
    bottom: 0px;
    border-radius: 16px;
`;

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
