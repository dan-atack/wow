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
  border: 2px solid darkblue;
  border-radius: 12px;
  position: relative;
  background-color: white;
  padding: 8px;
  bottom: -15%;
  left: 25%;
  max-width: 75%;
`;

export default Dialogue;
