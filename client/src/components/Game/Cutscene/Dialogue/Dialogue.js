import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

function Dialogue({ text, option, type, advanceScene, setResponse }) {

  const selectChoice = (response) => {
    setResponse(response)
    advanceScene()
  }

  const TextElement = () => {
    return (
      <Wrapper>
        <h1>{text}</h1>
      </Wrapper>
    )
  }

  return (
    <>
      {option &&
        <ChoiceWrapper>
          {
            Object.values(option).map((choice, index) => {
              return <Choice key={index + 1} onClick={() => selectChoice(choice.response)}>{choice.text}</Choice>
            })
          }
        </ChoiceWrapper>
      }
      <TextElement/>
    </>
  );
}

const Choice = styled.button`
  width: 100%;
  height: 50px;
  background: white;
`

const ChoiceWrapper = styled.div`
  position: absolute;
  width: 300px;
  top: 0px;
  left: 0px;
`

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
