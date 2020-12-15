import React from 'react';
import styled from 'styled-components';

const TerrainTile = ({ type }) => {
    return (
        <Wrapper>
            TILE {type}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 50px;
    height: 50px;
`;

export default TerrainTile;