import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import combatState from '../../../../state';
import globalState from '../../../../state';

const ResetButton = () => {
    const [combatPhase, setCombatPhase] = useRecoilState(combatState.combatPhase);
    const [playerAttacksInQueue, setPlayerAttacksInQueue] = useRecoilState(combatState.playerAttacksInQueue);
    const [playerHealth, setPlayerHealth] = useRecoilState(combatState.playerHealth);
    const [playerAttackRadius, setPlayerAttackRadius] = useRecoilState(combatState.playerAttackRadius);
    const [playerHype, setPlayerHype] = useRecoilState(combatState.playerHype);
    const [playerCoords, setPlayerCoords] = useRecoilState(combatState.playerCoords);
    const [playerOrientation, setPlayerOrientation] = useRecoilState(combatState.playerOrientation);
    const [playerIsDead, setPlayerIsDead] = useRecoilState(combatState.playerIsDead);
    const [baddieHP, setBaddieHP] = useRecoilState(combatState.baddieHP);
    const [baddieCoords, setBaddieCoords] = useRecoilState(combatState.baddieCoords);
    const [baddieOrientation, setBaddieOrientation] = useRecoilState(combatState.baddieOrientation);
    const [baddieDecision, setBaddieDecision] = useRecoilState(combatState.baddieDecision);
    const [scene, setScene] = useRecoilState(globalState.scene)
    const handleClick = () => {
        // This is ugly AF and terribly not dry... but it *does* work!
        // TODO: Make default values object for greater flexibility if you ever wanna reset these hard-coded bastards.
        setPlayerAttacksInQueue([]);
        setPlayerHealth(100);
        setPlayerAttackRadius([]);
        setPlayerHype(0);
        setPlayerCoords({x:6, y:1});
        setPlayerOrientation('south');
        setPlayerIsDead(false);
        setBaddieHP(100);
        setBaddieCoords({ x: 6, y: 11 });
        setBaddieOrientation('north');
        setBaddieDecision({
            damage: 0,
            effect: '',
            name: '',
            shape: '',
            threshold: 0
        })
        setScene(scene - 1)
        setCombatPhase('noCombat');
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