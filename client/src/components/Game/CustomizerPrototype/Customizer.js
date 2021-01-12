import React from 'react';
import styled from 'styled-components';

function Customizer({ words }) {
  // to do: build character interface (stats, skills, skillsheet, intermittent between battles)
  // initial character construction
  // returned to periodically in between battles
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
