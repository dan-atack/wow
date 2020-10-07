import React from 'react';
import styled from 'styled-components';
import { useTime } from '../../../hooks/useTime';
import { useSelector } from 'react-redux';
import MinigameButton from './MinigameButton';
import Karmameter from './Karmameter';
import dialogueOptions from '../../../data/dialogueOptions.json';
// "Art"work imports
import upperCorner from '../../../assets/minigame_corner.png';
import interview from '../../../assets/promo_bg.png';

function MinigamePrototype() {
  const karma = useSelector((state) => state.player.karma);
  const showmanship = useSelector((state) => state.player.showmanship);
  // Trigger a re-render every 0.2 seconds:
  const now = useTime(200);
  // Tick off time:
  const [ticker, setTicker] = React.useState(0);
  // Buttons' values will be set initially as 1 and 2; these match the first 2 serial id's in the dialogue options dictionary.
  const [currentButtons, setCurrentButtons] = React.useState([0, 1]);
  // How many rounds of options have we gone through?
  const [round, setRounds] = React.useState(1);
  // Button update handler function:
  const updateButtons = () => {
    // Remember to add whatever the number of buttons is to prevent duplicate calls from the dialogtionary.
    setCurrentButtons([currentButtons[0] + 2, currentButtons[1] + 2]);
  };
  React.useEffect(() => {
    setTicker(ticker + 1);
    // When the ticker runs out we just feed you the next two button options and reset the ticker.
    // Use round number to limit how many times this cycle repeats.
    //
    if (ticker > 100 && round <= 2) {
      updateButtons();
      setTicker(0);
      setRounds(round + 1);
    }
  }, [now]);
  return (
    <MinigameUI>
      <img src={upperCorner} style={{gridArea: 'bleft', height: '50%', width: '100%'}}/>
      <TitleBanner style={{ gridArea: 'title' }}>MINIGAME</TitleBanner>
      <img src={upperCorner} style={{gridArea: 'brght', transform: 'rotateY(180deg)', height: '50%', width: '100%'}}></img>
      <SpeechBubble>Speech bubble!!</SpeechBubble>
      <Karmameter
        axisA={'karmic'}
        axisB={'showmanship'}
        valueA={karma}
        valueB={showmanship}
        style={{ gridArea: 'karma' }}
      ></Karmameter>
      <img src={interview} style={{gridArea: 'image', maxHeight: '50%'}}/>
      <MinigameButton
        buttonData={dialogueOptions[currentButtons[0]]}
      ></MinigameButton>
      <MinigameButton
        buttonData={dialogueOptions[currentButtons[1]]}
      ></MinigameButton>
      <h3>{10 - ticker}</h3>
      <h3>round: {round}</h3>
    </MinigameUI>
  );
}

const MinigameUI = styled.div`
  width: 80%;
  max-height: 60%;
  grid-area: ui;
  margin: 4% 9%;
  border: 5px solid red;
  display: grid;
  grid-template-areas:
    'bleft title title title title brght'
    'bleft bubbl bubbl karma karma brght'
    'bleft bubbl bubbl karma karma brght'
    'image image image image timer timer'
    'image image image image optns optns'
    'image image image image optns optns';
  grid-template-rows: 20% 15% 15% 20% 15% 15%;
  grid-template-columns: 10% 20% 20% 20% 20% 10%;
`;

const TitleBanner = styled.h1`
  border: 2px solid goldenrod;
  border-radius: 14px;
`

const SpeechBubble = styled.div`
  border: 2px solid black;
  border-radius: 24px;
  grid-area: bubbl;
`

export default MinigamePrototype;
