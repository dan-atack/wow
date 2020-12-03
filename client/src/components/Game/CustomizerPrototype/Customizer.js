import React from 'react';
import styled from 'styled-components';

function Customizer({ words }) {
  return (
    <Wrapper>
      <h1>Character Customization and Sandbox UI!!!</h1>
      <h1>{words}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-area: ui;
  margin: 4% 9%;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

export default Customizer;
