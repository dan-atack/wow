import React from 'react';
import styled from 'styled-components';
import Player from '../../../../assets/avatar_01.png';
import Valet from '../../../../assets/valet.png';
import Placeholder from '../../../../assets/character frames/images/Placeholder_01.png';
import PlaceholderB from '../../../../assets/character frames/images/Placeholder_01B.png';

function Character({ avatar, characterPosition }) {
  // there has GOT to be a better way than this, but for now...
  const characters = { player: Player, valet: Valet, placeholder: Placeholder, placeholderB: PlaceholderB };
  return (
    <Wrapper characterPosition={characterPosition}>
      <CharacterImg src={characters[avatar]}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  left: ${props=> props.characterPosition === 'left' && '12px'};
  right: ${props=> props.characterPosition === 'right' && '14px'};
  bottom: 127px;
`;

const CharacterImg = styled.img`
  background-image: url(${(props) => props.src}) no-repeat;
  height: 256px;
  width: 256px;
  border: 3px solid black;
  transition-duration: 0.25s;
`;

export default Character;
