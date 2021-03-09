import React from 'react';
import styled from 'styled-components';
import Tile0 from '../../../../assets/combat/tile-0.png';
import Tile1 from '../../../../assets/combat/tile-1.png';
import Turnbuckle from '../../../../assets/combat/turnbuckle.png';

// PROPS: Level = string name of level (required), x & y = self-explanatory, obstacle = string name of obstacle (optional),
// overlay = string name of overlay style (optional; options are 'playerMove', 'playerAttack' and 'baddieAttack'
// onClick = handler function
const TerrainTile = ({ level, x, y, obstacle, overlay, onClick }) => {
    const tiles = {
        tile0: Tile0,
        tile1: Tile1
    }
    // TO DO: Randomly choose from a random selection of possible tiles? Hard to do since rerenders are common!
    const even = x % 2;
    // Convert overlay codeword into color:
    const colorConverter = () => {
        switch(overlay) {
            case 'playerMove':
                return '#14E90D';
            case 'playerAttack':
                return '#E99C0D';
            case 'baddieAttack':
                return '#E9340D';
            default:
                return '#FFFFFF';
        }
    }
    const overlayColor = colorConverter();

    return (
        <Container
            cursor={overlay === 'playerAttack' || overlay === 'playerMove' ? 'pointer' : 'default'}
            onClick={onClick}
        >
            <Tile src={obstacle ? Turnbuckle : tiles[`tile${even}`]} className='tile' />
            <Overlay overlay={overlayColor} className='tile-overlay'/>
        </Container>
        
    ) 
};

const Container = styled.div`
    position: relative;
    cursor: ${props => props.cursor};
`

const Tile = styled.div`
    width: 50px;
    height: 50px;
    background: url(${(props) => props.src}) no-repeat;
    border: 1px solid black;
    opacity: 1;
`;

const Overlay = styled.div`
    position: absolute;
    height: 50px;
    width: 50px;
    top: 0;
    left: 0;
    background-color: ${props => props.overlay};
    opacity: 0.3;
`

export default TerrainTile;