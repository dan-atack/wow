import React from 'react';
import styled from 'styled-components';
import TickerBox from '../TickerBox';

// The Karmameter will be a round display output which tracks your position on two axes: Karmic and Virtuosic
// Later iterations of this should have space for inner rings/regions to indicate when your dialogue choices have
// nudged you towards eligibility for certain bonuses/powerups/unique moves.
function Karmameter({ karma, showmanship, minigameRound, ticker, ROUND_DURATION }) {
  // There should be a color variable that's influenced by values at some point down the line...

  return (
    <Wrapper>
      <Casing>
        <CompassPoint style={{ right: '40%', top: '-14%', color: 'limegreen' }}>GOOD{karma > 0 ? `: ${karma}` : ''}</CompassPoint>
        <CompassPoint style={{ right: '40%', top: '100%', color: 'red' }}>EVIL{karma < 0 ? `: ${karma}` : ''}</CompassPoint>
        <CompassPoint style={{ right: '90%', top: '50%', color: 'orange' }}>BOMBASTIC{showmanship > 0 ? `: ${showmanship}` : ''}</CompassPoint>
        <CompassPoint style={{ right: '-32%', top: '50%', color: 'darkblue' }}>LACONIC{showmanship < 0 ? `: ${showmanship}` : ''}</CompassPoint>
        <Blip vertical={karma} horizontal={showmanship}></Blip>
      </Casing>
      <TickerBox value={minigameRound} gridArea={'roundr'} text={'Current Round:'}></TickerBox>
      <TickerBox value={(ROUND_DURATION-(ticker/15)).toFixed(2)} gridArea={'timerr'} text={'Time Remaining:'}></TickerBox>
    </Wrapper>
  );
}

const Casing = styled.div`
  font-size: 1em;
  background-color: #228c13;
  border: 3px solid black;
  border-radius: 50%;
  color: whitesmoke;
  position: relative;
  grid-area: casing;
`;

const Blip = styled.div`
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid black;
  position: absolute;
  left: ${(props) => `calc(${props.horizontal + 50}% - 8px)`};
  bottom: ${(props) => `calc(${props.vertical + 50}% - 8px)`};
`

const CompassPoint = styled.h3`
  position: absolute;
  margin: 0;
`

const Wrapper = styled.div`
  grid-area: karma;
  display: grid;
  grid-template-areas:
  'casing casing'
  'roundr timerr';
  grid-template-rows: 2fr 1fr;
  margin-left: 10%;
  justify-content: space-around;
`

export default Karmameter;
