import React from 'react';
import styled from 'styled-components';

function MinigamePrototype({ words }) {
  return (
    <Wrapper>
      <h1>MINIGAME</h1>
      <h1>{words}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-area: ui;
  margin: 4% 9%;
  border: 2px solid black;
`;

export default MinigamePrototype;
