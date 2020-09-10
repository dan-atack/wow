import React from 'react';
import styled from 'styled-components';
import { useTime } from '../../../hooks/useTime';
import { useSelector } from 'react-redux';
import MinigameButton from './MinigameButton';

function MinigamePrototype() {
  const karma = useSelector((state) => state.player.karma);
  // Trigger a re-render every 0.2 seconds:
  const now = useTime(200);
  // Tick off time:
  const [ticker, setTicker] = React.useState(0);
  // Button's value will be set initially:
  const [buttonData, setButtonData] = React.useState({
    alignment: 'good',
    text: 'Something witty!',
    karmicValue: 15,
  });
  React.useEffect(() => {
    setTicker(ticker + 1);
    // this is a hard-coded basic example of a value being modified by the timer:
    if (ticker > 15 && karma === 0) {
      setButtonData({
        alignment: 'evil',
        text: 'Something less witty.',
        karmicValue: -10,
      });
    }
  }, [now]);
  return (
    <Wrapper>
      <h1>MINIGAME</h1>
      <Karmometer karma={karma}>Player Karma: {karma}</Karmometer>
      <MinigameButton buttonData={buttonData}></MinigameButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-area: ui;
  margin: 4% 9%;
  border: 2px solid black;
`;

const Karmometer = styled.h2`
  height: 128px;
  width: 256px;
  font-size: 2em;
  background-color: ${(props) => (props.karma > 0 ? 'limegreen' : 'red')};
  border: 3px solid whitesmoke;
  border-radius: 18px;
`;

export default MinigamePrototype;
