import React from 'react';
import styled from 'styled-components';

function CutscenePrototype({ character, background, text, duration }) {
  return (
    <Wrapper>
      <h1>CUTSCENE</h1>
      <Character />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80vh;
  width: 80vw;
  margin: 4% 9%;
  border: 2px solid black;
`;

const Character = styled.img`
  height: 30vh;
  width: 20vw;
  position: relative;
  bottom: 5%;
  left: 15%;
  border: 3px solid green;
  border-radius: 12px;
  transition-duration: 0.25s;
`;

export default CutscenePrototype;
