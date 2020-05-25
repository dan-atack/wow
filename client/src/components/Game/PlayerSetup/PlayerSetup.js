import React from 'react';
import styled from 'styled-components';
import avatar01 from '../../../assets/avatar_01.png';

function PlayerSetup() {
  const [ptsRemaining, setPtsRemaining] = React.useState(15);
  return (
    <Wrapper>
      <h2 style={{ gridArea: 'skillhead' }}>Select Skills:</h2>
      <Avatar src={avatar01} alt='player' />
      <h2 style={{ gridArea: 'attribhead' }}>Select Attributes:</h2>
      <PointsDisplay>
        <h3>Points Remaining:</h3>
        <h1>{ptsRemaining}</h1>
      </PointsDisplay>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  grid-area: disp;
  display: grid;
  grid-template-areas:
    'skillhead avatar attribhead'
    'skills avatar attribs'
    'skills ptsleft attribs';
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 2fr 1fr 2fr;
  justify-content: center;
`;

const Avatar = styled.img`
  border: 2px solid grey;
  border-radius: 50%;
  height: 128px;
  width: 128px;
  grid-area: avatar;
`;

const PointsDisplay = styled.div`
  border: 2px solid darkgray;
  height: 128px;
  width: 128px;
  margin-top: 8px;
  border-radius: 50%;
  grid-area: ptsleft;
  justify-self: center;
`;

const Options = styled.div``;

export default PlayerSetup;
