import React from 'react';
import styled from 'styled-components';
import baddieData from '../../../../data/baddie.json';
// Asset Imports
import PlayerSprite from '../../../../assets/combat/player.png';
import Tony from '../../../../assets/combat/tony.gif';

// The Sprite Tile will be the component for rendering the Player and Baddie in the Combat Environment.

// Props: level (string; corresponds to an entry in the baddie.json file and is used to look up the baddie's name-o)
// onClick (handler function for a clickable baddie), isPlayer (boolean: is this the Player? If yes, show the Player's img)
// Children can be other React components, such as the notorious POW effect that is shown when the Player takes damage.
const SpriteTile = ({ level, onClick, isPlayer, children }) => {
  const baddie = baddieData.find((baddie) => baddie.level === level)
    return (
        <Wrapper onClick={onClick} clickable={onClick ? true : false}>
            {isPlayer ?
            <Sprite src={PlayerSprite} /> :
            <Sprite src={Tony} />
            }
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  position: relative;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
`;

const Sprite = styled.img`
  object-fit: contain;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  background-color: red;
`;

export default SpriteTile;