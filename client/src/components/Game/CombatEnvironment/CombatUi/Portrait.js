import React from 'react';
import styled from 'styled-components';

const Portrait = (props) => {
    return (
        <Wrapper>
            <Image src={props.character} alt='character portrait'/>
        </Wrapper>
    )
}

export default Portrait

const Image = styled.img`
    width: 200px;
    transform: scaleX(-1);
    position: absolute;
    bottom: 0px;
    right: 0px;
`

const Wrapper = styled.div`
    width: 200px;
    height: 256px;
    border: 2px solid black;
    background: ${props => props.backgroundColor || 'orange'};
    position: relative;
`