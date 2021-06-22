import React from 'react';
import styled from 'styled-components';

import ReplayIcon from '@material-ui/icons/Replay';

const AttackQueue = (props) => {
    const {attacks} = props
    return (
        <Wrapper>
            {
                attacks.length > 0 &&
                    attacks.map((attack, index) => {
                        return (
                            <TileWrapper>
                                {
                                    attack.icon && 
                                        <img 
                                            src={require(`../../../../assets/actionIcons/${attack.icon}`)}
                                            alt={attack.name}
                                        /> || attack.name
                                }
                            </TileWrapper>
                        )
                    })
            }
            {
                attacks.length > 0 &&
                    <button>
                        <ReplayIcon color='inherit'/>
                    </button>
            }
        </Wrapper>
    )
}

export default AttackQueue

const TileWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    background-color: white;
`

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    justify-content: center;
    align-items: center;
`