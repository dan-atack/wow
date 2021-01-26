import React from 'react';
import styled from 'styled-components';

function TimerBox({ value, text }) {
    return (
        <Wrapper>
          <Ticker progress={value/3 * 100}/>
          <Label>{text}</Label>
        </Wrapper>
    )
}

const Ticker = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: ${props => props.progress}%;
  width: 100%;
  transition: all .2s;
  background: orange;
  opacity: .5;
`

const Label = styled.h5` 
`

const Wrapper = styled.div`
    border: 2px solid black;
    width: 100px;
    height: 100%;
    background-color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: none;
`

export default TimerBox;