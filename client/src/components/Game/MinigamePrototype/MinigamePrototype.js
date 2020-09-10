import React from 'react';
import styled from 'styled-components';
import { useTime } from '../../../hooks/useTime';
import { useDispatch, useSelector } from 'react-redux';
import { setKarma } from '../../../actions';

function MinigamePrototype() {
  // Trigger a re-render every 0.2 seconds:
  const now = useTime(200);
  const [ticker, setTicker] = React.useState(0);
  React.useEffect(() => {
    setTicker(ticker + 1);
  }, [now]);
  return (
    <Wrapper>
      <h1>MINIGAME</h1>
      <h1>{ticker}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-area: ui;
  margin: 4% 9%;
  border: 2px solid black;
`;

export default MinigamePrototype;
