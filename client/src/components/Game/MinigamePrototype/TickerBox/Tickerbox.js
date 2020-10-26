import React from 'react';
import styled from 'styled-components';

function Tickerbox({ value, gridArea, text }) {
    return (
        <Wrapper gridArea={gridArea}>
            <Label>{text}</Label>
            <TimeLeft>{value}</TimeLeft>
        </Wrapper>
    )
}

const TimeLeft = styled.h3`
    color: black;
`

const Label = styled.h5`
    margin-top: -5%;
`

const Wrapper = styled.div`
    border: 2px solid black;
    border-radius: 50%;
    width: 84px;
    height: 84px;
    margin-top: 2%;
    padding: 5%;
    grid-area: ${(props) => props.gridArea};
    background-color: #3f704d;
`

export default Tickerbox;