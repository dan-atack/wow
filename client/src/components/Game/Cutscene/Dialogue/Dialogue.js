import React from 'react';
import styled from 'styled-components';

function Dialogue({ text }) {
  return (
    <Wrapper>
      <h1>{text}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 3px solid black;
  position: absolute;
  background-color: white;
  padding: 8px;
  bottom: 12px;
  left: 12px;
  height: 100px;
  width: calc(100% - 48px);
`;

export default Dialogue;
