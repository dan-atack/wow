import React from 'react';
import styled from 'styled-components';
import Tile0 from '../../../../assets/combat/tile-0.png';
import Tile1 from '../../../../assets/combat/tile-1.png';
import Turnbuckle from '../../../../assets/combat/turnbuckle.png';

// PROPS: Level = string name of level (required), obstacle = string name of obstacle (optional)
const TerrainTile = ({ level, obstacle, x, y }) => {
    if (obstacle) console.log(obstacle);
    const tiles = {
        tile0: Tile0,
        tile1: Tile1
    }
    // TO DO: Randomly choose from a random selection of possible tiles? Hard to do since rerenders are common!
    const even = x % 2;

    return <Tile src={obstacle ? Turnbuckle : tiles[`tile${even}`]}/>
};

const Tile = styled.div`
    width: 50px;
    height: 50px;
    background: url(${(props) => props.src}) no-repeat;
    border: 1px solid black;
    opacity: 0.5;
`;

export default TerrainTile;