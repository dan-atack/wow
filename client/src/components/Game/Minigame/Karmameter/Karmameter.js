import React from 'react';
import styled from 'styled-components';
import TickerBox from '../TickerBox';
import TimerBox from '../TimerBox';

// The Karmameter will be a round display output which tracks your position on two axes: Karmic and Virtuosic
// Later iterations of this should have space for inner rings/regions to indicate when your dialogue choices have
// nudged you towards eligibility for certain bonuses/powerups/unique moves.
function Karmameter({ karma, showmanship, minigameRound, ticker, ROUND_DURATION }) {
  // There should be a color variable that's influenced by values at some point down the line...

  return (
    <Wrapper>
      <Casing>
        <CompassPoint style={{ right: '46%', top: '0px', color: 'limegreen' }}>GOOD{karma > 0 ? `: ${karma}` : ''}</CompassPoint>
        <CompassPoint style={{ right: '46%', bottom: '0px', color: 'red' }}>EVIL{karma < 0 ? `: ${karma}` : ''}</CompassPoint>
        <CompassPoint style={{ left: '0px', top: '47.5%', color: 'orange' }}>BOMBASTIC{showmanship > 0 ? `: ${showmanship}` : ''}</CompassPoint>
        <CompassPoint style={{ right: '0px', top: '47.5%', color: 'darkblue' }}>LACONIC{showmanship < 0 ? `: ${showmanship}` : ''}</CompassPoint>
        <Blip vertical={karma} horizontal={showmanship}></Blip>
      </Casing>
      <ColumnFlexDiv>
        <TickerBox value={minigameRound} text={'Current Round:'}/>
        <TimerBox value={(ROUND_DURATION-(ticker/15)).toFixed(2)} text={'Time Remaining:'}/>
      </ColumnFlexDiv>
    </Wrapper>
  );
}

const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const Casing = styled.div`
  font-size: 1em;
  background: rgb(79,251,63);
  background: radial-gradient(circle, rgba(79,251,63,1) 8%, rgba(250,0,0,1) 100%);
  border: 2px solid black;
  border-right: none;
  border-bottom: none;
  color: white;
  position: relative;
  width: 100%;
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
  transform: translate(-50%, 0); 
`

const CompassPoint = styled.h3`
  position: absolute;
  margin: 0;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

export default Karmameter;
