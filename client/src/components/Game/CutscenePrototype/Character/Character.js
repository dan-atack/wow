import React from 'react';
import styled from 'styled-components';
import Player from '../../../../assets/avatar_01.png';
import Valet from '../../../../assets/valet.png';

function Character({ avatar }) {
  // there has GOT to be a better way than this, but for now...
  const characters = { player: Player, valet: Valet };
  return (
    <Wrapper>
      <CharacterImg src={characters[avatar]} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  left: -40%;
  bottom: -40%;
`;

const CharacterImg = styled.img`
  background-image: url(${(props) => props.src}) no-repeat;
  height: 256px;
  width: 256px;
  border: 3px solid green;
  border-radius: 50%;
  transition-duration: 0.25s;
`;

export default Character;
