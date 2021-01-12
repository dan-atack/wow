import React from 'react';
import styled from 'styled-components';
// TO DO: Import image file for use as the 'skin'

const TerrainTile = ({ type, text }) => {
    // Determine the terrain's "skin" by referring to its type:
    let skin = '';

    return (
        <Wrapper>
            {text}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 50px;
    height: 50px;
    background-color: grey;
    border: 1px solid black;
    opacity: 0.5;
`;

export default TerrainTile;