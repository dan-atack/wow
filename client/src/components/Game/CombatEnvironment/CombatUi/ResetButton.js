import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import combatState from '../../../../state';
import { setScene, setCombatPhase } from '../../../../actions';

const ResetButton = () => {
    const dispatch = useDispatch();
    const scene = useSelector((state) => state.game.scene); // Use to rewind player to 1 scene before the fight they just lost.
    const [playerHealth, setPlayerHealth] = useRecoilState(combatState.playerHealth);
    const [playerAttackRadius, setPlayerAttackRadius] = useRecoilState(combatState.playerAttackRadius);
    const [playerHype, setPlayerHype] = useRecoilState(combatState.playerHype);
    const [playerCoords, setPlayerCoords] = useRecoilState(combatState.playerCoords);
    const [baddieHP, setBaddieHP] = useRecoilState(combatState.baddieHP);
    const [baddieCoords, setBaddieCoords] = useRecoilState(combatState.baddieCoords);
    const [baddieDecision, setBaddieDecision] = useRecoilState(combatState.baddieDecision);
    const handleClick = () => {
        setPlayerHealth(100);
        setPlayerAttackRadius([]);
        setPlayerHype(0);
        setPlayerCoords({x:6, y:1});
        // TODO: Reset the rest of the shit.
        dispatch(setScene(scene - 1))
        dispatch(setCombatPhase('noCombat'));
    }
    return (
        <Wrapper>
            <Button onClick={handleClick}>Play Again?</Button>
        </Wrapper>
    )
};

const Button = styled.button`
    color: white;
    background-color: #A93355;
    font-size: 24px;
    height: 96px;
    width: 192px;
    border: 2px solid black;
    border-radius: 16px;
`;

const Wrapper = styled.div`
    position: absolute;
    z-index: 100;
    left: 200px;
    top: 200px;
    box-shadow: 0px 0px 32px 16px darkred;
    border-radius: 16px;
`;

export default ResetButton;