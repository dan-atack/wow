import React from 'react';
import styled from 'styled-components';

function FightPrototype({ words }) {
  return (
    <Wrapper>
      <h1>FIGHT SCENE</h1>
      <h1>{words}</h1>
      <h1>GET READY TO RUMBLE</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80vh;
  width: 80vw;
  margin: 4% 9%;
  border: 2px solid black;
`;

export default FightPrototype;
