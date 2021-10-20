import React from 'react'
import styled from 'styled-components';
// State, to update:
import combatState from '../../../../../state';
import { useRecoilValue, useRecoilState } from 'recoil';

const AttackAddMove = () => {

    const [playerAttackSelecting, setPlayerAttackSelecting] = useRecoilState(combatState.playerAttackSelecting);

    const attackButtonHandler = () => {
        console.log('attack!');
        setPlayerAttackSelecting('notSelecting');
    }

    const addMoveButtonHandler = () => {
        console.log('add a move!')
        setPlayerAttackSelecting('selectingMove');
    }

    return (
        <Wrapper>
            <button onClick={() => attackButtonHandler}>ATTACK</button>
            <button onClick={() => addMoveButtonHandler}>ADD MOVE</button>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: absolute;
    left: 10%;
    height: 128px;
    width: 256px;
    border: 1px solid black;
    border-radius: 8px;
`

export default AttackAddMove;