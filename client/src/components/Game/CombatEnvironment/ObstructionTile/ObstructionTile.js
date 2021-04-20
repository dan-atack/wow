import React from 'react';
import styled from 'styled-components';

import obstructionData from '../../../../data/obstructions.json';

const ObstructionTile = ({ obstacle, x, y }) => {
    const obstruction = obstructionData.find((obs) => obs.name === obstacle);
    return (  
        <Tile backgroundColor={obstruction.color}>
            {obstacle}
        </Tile>
    )
}

export default ObstructionTile

const Tile = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid black;
    background-color: ${props => props.backgroundColor};
    opacity: 1;
`;