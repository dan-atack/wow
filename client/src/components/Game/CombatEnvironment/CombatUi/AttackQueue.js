import React from 'react';
import styled from 'styled-components';

import ReplayIcon from '@material-ui/icons/Replay';
import { playerHype, playerAttacksInQueue } from '../../../../state/combatState';
import {useRecoilState} from 'recoil'

const AttackQueue = () => {
    const [hype, setHype] = useRecoilState(playerHype);
    const [attacks, setAttacks] = useRecoilState(playerAttacksInQueue);

    const handleClick = (attack) => {
        const index = attacks.findIndex(atk => atk === attack);
        let tempArray = [...attacks];
        tempArray.splice(index, 1);
        setHype(hype + attack.cost);
        setAttacks(tempArray);
    }   

    return (
        <Wrapper>
            {
                attacks.length > 0 &&
                    attacks.map((attack, index) => {
                        return (
                            <TileWrapper
                                key={index + 1}
                            >
                                {
                                    attack.icon && 
                                        <img 
                                            src={require(`../../../../assets/actionIcons/${attack.icon}`)}
                                            alt={attack.name}
                                        /> || attack.name
                                }
                                {
                                    ((index + 1 === attacks.length) && 
                                    (attacks.length > 0)) && 
                                        <UndoButton onClick={() => handleClick(attack)}>
                                            <ReplayIcon color='inherit'/>
                                        </UndoButton>
                                }
                            </TileWrapper>
                        )
                    })
            }
        </Wrapper>
    )
}

export default AttackQueue

const TileWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    background-color: white;
    position: relative;
`

const UndoButton = styled.button`
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: yellow;
    color: red;
    bottom: 0px;
    right: 0px;
`

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    justify-content: center;
    align-items: center;
`