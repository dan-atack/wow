import React from 'react';
import styled from 'styled-components';

const DevDisplay = ({
        playerHP,
        playerAP,
        playerHype,
        playerCoords,
        playerOrientation,
        baddieHP,
        baddieCoords,
        baddieOrientation,
        baddieDecision
    }) => {
    return (
        <Wrapper>
            <p>Player HP: {playerHP}</p>
            <p>Player AP: {playerAP}</p>
            <p>Player Hype: {playerHype}</p>
            <p>Player Coords: ({playerCoords.x}, {playerCoords.y})</p>
            <p>Player Orientation: {playerOrientation}</p>
            <p>Baddie HP: {baddieHP}</p>
            <p>Baddie Coords: ({baddieCoords.x}, {baddieCoords.y})</p>
            <p>Baddie Orientation: {baddieOrientation}</p>
            <p>Baddie Decision: {baddieDecision.name}</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 50px;
    right: 200px;
`

export default DevDisplay;