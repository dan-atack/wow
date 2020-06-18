import React from 'react';
import styled from 'styled-components';

function Customizer({ words }) {
  return (
    <Wrapper>
      <h1>Character Customization</h1>
      <h1>{words}</h1>
      <h1>Skill points</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80vh;
  width: 80vw;
  margin: 4% 9%;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

export default Customizer;
