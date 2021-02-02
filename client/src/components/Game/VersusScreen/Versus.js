import React from 'react';
import styled from 'styled-components';

const Versus = () => {
    return (
        <Wrapper>
            <LeftSideDiv> 
                test
            </LeftSideDiv>
            <LeftSideDiv>
                test
            </LeftSideDiv>
        </Wrapper>
    )
}


const LeftSideDiv = styled.div`
    height: 80%;
    width: 200px;
    position: relative;
    transform: skew(-30deg);
    background: orange;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0px;
    left: 0px;
    z-index: 20000;
`

export default Versus