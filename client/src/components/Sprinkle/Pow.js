import React from 'react';
import styled, { keyframes } from 'styled-components';

import powImg from '../../assets/pow.png';

const Pow = () => {
  const xPos = Math.random() * 100;
  const yPos = Math.random() * 100;
  return (
    <StyledPow src={powImg} xPos={xPos} yPos={yPos}/>
  )
}

const disappear = keyframes`
  0% {
    opacity: 1;
    display: block;
  };
  90% {
    opacity: 1;
    display: block;
  };
  100% {
    opacity: 0;
    display: none;
  };
`

const StyledPow = styled.img`
  animation: ${disappear} 1s 1;
  position: absolute;
  top: ${props => props.yPos + '%'};
  right: ${props => props.xPos + '%'};
  opacity: 0;
`

export default Pow