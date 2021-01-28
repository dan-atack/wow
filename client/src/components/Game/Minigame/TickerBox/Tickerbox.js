import React from 'react';
import styled from 'styled-components';

function Tickerbox({ value, text }) {
    return (
        <Wrapper>
            <Label>{text}</Label>
            <TimeLeft>{value}</TimeLeft>
        </Wrapper>
    )
}

const TimeLeft = styled.h3`
    color: black;
`

const Label = styled.h5`
`

const Wrapper = styled.div`
    border: 2px solid black;
    width: 100px;
    height: 100%;
    background-color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom:none;
`

export default Tickerbox;