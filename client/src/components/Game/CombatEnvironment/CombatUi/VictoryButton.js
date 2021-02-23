import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import combatState from '../../../../state';
import { setScene, setCombatPhase } from '../../../../actions';

const VictoryButton = () => {
    const dispatch = useDispatch();
    const scene = useSelector((state) => state.game.scene); // Use to advance player to the next scene!
    const [playerHealth, setPlayerHealth] = useRecoilState(combatState.playerHealth);   // tidy up all of the combat state values.
    const [playerAttackRadius, setPlayerAttackRadius] = useRecoilState(combatState.playerAttackRadius);
    const [playerHype, setPlayerHype] = useRecoilState(combatState.playerHype);
    const [playerCoords, setPlayerCoords] = useRecoilState(combatState.playerCoords);
    const [playerIsDead, setPlayerIsDead] = useRecoilState(combatState.playerIsDead);
    const [baddieHP, setBaddieHP] = useRecoilState(combatState.baddieHP);
    const [baddieCoords, setBaddieCoords] = useRecoilState(combatState.baddieCoords);
    const [baddieDecision, setBaddieDecision] = useRecoilState(combatState.baddieDecision);
    const handleClick = () => {
        setPlayerHealth(100);
        setPlayerAttackRadius([]);
        setPlayerHype(0);
        setPlayerCoords({x:6, y:1});
        setPlayerIsDead(false);
        setBaddieHP(100);
        setBaddieCoords({ x: 6, y: 11 });
        setBaddieDecision({
            damage: 0,
            effect: '',
            name: '',
            shape: '',
            threshold: 0
        })
        dispatch(setScene(scene + 1))
        dispatch(setCombatPhase('noCombat'));
    }
    return (
        <Wrapper>
            <Button onClick={handleClick}>VICTORY!!!</Button>
        </Wrapper>
    )
};

const Button = styled.button`
    color: whitesmoke;
    background-color: rgb(17, 155, 4);
    font-size: 36px;
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
    box-shadow: 0px 0px 32px 16px limegreen;
    border-radius: 16px;
`;

export default VictoryButton;