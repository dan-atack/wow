import React from 'react';
import styled from 'styled-components';

function CutscenePrototype({ words }) {
  return (
    <Wrapper>
      <h1>CUTSCENE</h1>
      <h1>{words}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80vh;
  width: 80vw;
  margin: 4% 9%;
  border: 2px solid black;
`;

export default CutscenePrototype;
