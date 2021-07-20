import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setCombatPhase } from '../../../../actions';
import combatState from '../../../../state';
import { useRecoilState } from 'recoil';
import { advanceCombatWithMovement } from '../../../../Helpers/generalCombatHelpers';

const OrientationPicker = () => {
    const dispatch = useDispatch();
    const [playerCoords, setPlayerCoords] = useRecoilState(combatState.playerCoords);
    const [playerMovementDecision, setPlayerMovementDecision] = useRecoilState(combatState.playerMovementDecision);
    const [playerOrientation, setPlayerOrientation] = useRecoilState(combatState.playerOrientation);
    const [combatAnimation, setCombatAnimation] = useRecoilState(combatState.combatAnimation);
    // Handler for the various buttons:
    const selectionHandler = (direction) => {
        setPlayerOrientation(direction);
        const coords = { x: playerMovementDecision.x, y: playerMovementDecision.y }
        setPlayerMovementDecision({ x: -1, y: -1 }) // set a position outside the possible render area?
        // TODO: Make delay until next phase dependent on distance (quick delta x + delta y calculation - make another helper?)
        advanceCombatWithMovement(1000, 'baddieAction', dispatch, setCombatPhase, setPlayerCoords, coords, setCombatAnimation);
    }
    return (
        <Wrapper>
            <Option
                style={{ top: 0, left: 17, backgroundColor: 'red' }}
                onClick={() => selectionHandler('north')}
            ></Option>
            <Option
                style={{ top: 17, right: 0, backgroundColor: 'yellow' }}
                onClick={() => selectionHandler('east')}
            ></Option>
            <Option
                style={{ bottom: 0, right: 17, backgroundColor: 'green' }}
                onClick={() => selectionHandler('south')}
            ></Option>
            <Option
                style={{ top: 17, left: 0, backgroundColor: 'blue' }}
                onClick={() => selectionHandler('west')}
            ></Option>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    height: 50px;
    width: 50px;
    border: 1px solid black;
`

const Option = styled.button`
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: lime;
`

export default OrientationPicker;