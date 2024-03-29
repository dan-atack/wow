import React from 'react';
import styled from 'styled-components';

function Character({ avatar, characterPosition, background }) {
  // there has GOT to be a better way than this, but for now...
  return (
    <Wrapper characterPosition={characterPosition} background={background}>
      <CharacterBorder>
        <CharacterImg src={require(`../../../../assets/character frames/images/${avatar}.png`)}/> 
      </CharacterBorder>
    </Wrapper>
  );
}

const CharacterImg = styled.img`
  height: 256px;
  width: 256px;
`

const Wrapper = styled.div`
  position: absolute;
  left: ${props=> props.characterPosition === 'left' && '12px'};
  right: ${props=> props.characterPosition === 'right' && '14px'};
  bottom: 127px;
  background-color: ${props => props.background || 'rgb(204, 204, 255)'};
`;

const CharacterBorder = styled.div`
  height: 256px;
  width: 256px;
  border: 3px solid black;
  transition-duration: 0.25s;
  position:relative;
`;



export default Character;
