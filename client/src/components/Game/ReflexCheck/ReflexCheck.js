import React from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import ugh from '../../../assets/sounds/ugh-01.mp3';
import { useTime } from '../../../hooks/useTime';
import { useDispatch } from 'react-redux';
import combatState from '../../../state';
import globalState from '../../../state';
import { useRecoilState, useRecoilValue } from 'recoil';
import { setCombatPhase, stopReflexCheck } from '../../../actions';
import { determineObstacle, advanceCombatSequence } from '../../../Helpers/generalCombatHelpers';
import data from '../../../data/mapSeed.json';

// Combo = integer for which of the 3 possible key combos to use for the reflex check:
function ReflexCheck({ combo }) {
    const dispatch = useDispatch();
    // Update time at very short interval to 'sample' for updates at high frequency:
    let now = useTime(20);
    const [then, setThen] = React.useState(0);
    // Keep track of current key index and number of keys pressed - reflex check ends as soon as a wrong key is pressed.:
    const [currentKey, setCurrentKey] = React.useState(0);
    const [keystrokes, setKeystrokes] = React.useState(0);
    // Local state determines when the Reflex Check is over:
    const [failStatus, setFailStatus] = React.useState(false);
    const [successStatus, setSuccessStatus] = React.useState(false);
    // We need to know the level to get the obstacles for the throw calculator. Jesus Christ.
    const level = useRecoilValue(globalState.level);
    const seed = data.find((obj) => obj.level === level);
    // Baddie HP and position to be set (reduced and shifted, respectively) by a successful completion of the reflex check:
    const [baddieHP, setBaddieHP] = useRecoilState(combatState.baddieHP);
    const [baddieCoords, setBaddieCoords] = useRecoilState(combatState.baddieCoords);
    const [baddieStatus, setBaddieStatus] = useRecoilState(combatState.baddieStatus);
    // Player Hype is also affected by reflex check outcomes:
    const [playerHype, setPlayerHype] = useRecoilState(combatState.playerHype);
    // Now using state to pass all move data:
    const playerMovesInQueue = useRecoilValue(combatState.playerAttacksInQueue);
    // Player Orientation and position can determine the throw direction of successful attacks:
    const playerCoords = useRecoilValue(combatState.playerCoords);
    const playerOrientation = useRecoilValue(combatState.playerOrientation);
    // Keep track of where we're at in the attack queue:
    const [attackQueueIndexPosition, setAttackQueueIndexPosition] = React.useState(0);
    // Set initial time to execute the first combo:
    const timeToPerform = playerMovesInQueue[0].time * (1 - playerMovesInQueue.length * 0.1);
    // Then keep track of the time remaining in state (these can be reset in the event of a multi-attack):
    const [timeLeft, setTimeLeft] = React.useState(timeToPerform);
    const [timeString, setTimeString] = React.useState('00:00.00');
    // Introducing sound effects:
    const [playUghSound] = useSound(ugh);
    // This function calculates the damage you inflict if you succeed:
    const determineDamage = () => {
        const remainder = timeLeft / playerMovesInQueue[attackQueueIndexPosition].time * 100;
        if (remainder > 75) {
            return playerMovesInQueue[attackQueueIndexPosition].baseDmg * 2;                // Double damage if you have more than 75% time left
        } else if (remainder > 50) {
            return Math.ceil(playerMovesInQueue[attackQueueIndexPosition].baseDmg * 1.5);   // 50% bonus damage if you have more than 50% time left
        } else {
            return playerMovesInQueue[attackQueueIndexPosition].baseDmg;                    // Otherwise you just do the base dmg.
        }
    }
    // If you hit, Hype earned = (max hype plus combo length in letters) times time remaining.
    const determineHype = () => {
        const remainder = timeLeft / playerMovesInQueue[attackQueueIndexPosition].time;     // Just the fraction this time
        const stringLength = playerMovesInQueue[attackQueueIndexPosition].combos[combo].length  // Find how many keys were needed to complete the move
        return Math.floor((playerMovesInQueue[attackQueueIndexPosition].maxHype + stringLength) * remainder);
    }

    // Determine how far to throw the baddie if the attack succeeds:
    const determineThrow = () => {
        let distance = 0;
        const remainder = timeLeft / playerMovesInQueue[attackQueueIndexPosition].time * 100;
        // Every attack has three possible ranges; fast reflexes throw the farthest (first index position = largest possible distance):
        if (remainder > 67) {
            distance = playerMovesInQueue[attackQueueIndexPosition].throwDistances[0];
        } else if (remainder > 33) {
            distance = playerMovesInQueue[attackQueueIndexPosition].throwDistances[1];
        } else {
            distance = playerMovesInQueue[attackQueueIndexPosition].throwDistances[2];
        }
        const destination = determineObstacle(distance, playerOrientation, playerCoords, baddieCoords, seed);
        console.log(`DESTINATION: ${destination.x}, ${destination.y}`);
        setBaddieCoords(destination);
    }

    // What happens if you complete the LAST combo in the queue:
    const finalAttackSuccess = () => {
        setSuccessStatus(true);
        const attackAnimationDelay = playerMovesInQueue.length * 1000;  // Delay for 1 second per attack
        advanceCombatSequence(attackAnimationDelay, 'specialEvent', dispatch, setCombatPhase);
        dispatch(stopReflexCheck());
    }

    // What happens if you are NOT on the last combo in the queue:
    const setupNextAttack = () => {
        // Reset timer to the time value of the next move, minus 10 percent per previously executed move:
        setTimeLeft(playerMovesInQueue[attackQueueIndexPosition].time * (1 - playerMovesInQueue.length * 0.1));
        // Reset keystroke tracker:
        setCurrentKey(0);
        setKeystrokes(0);
    }

    // What happens when you complete a combo (regardless of how many attacks are queued):
    const attackSuccess = () => {
        playUghSound();
        // console.log(`Player hits baddie with ${playerMovesInQueue[attackQueueIndexPosition].name} for ${determineDamage()} damage!`);
        // console.log(`Player gains ${determineHype()} hype points!`);

        if (playerMovesInQueue[attackQueueIndexPosition].effect) {
            const { effect, duration } = playerMovesInQueue[attackQueueIndexPosition];

            if (effect.type === 'positional') {
                setBaddieStatus({ ...baddieStatus, positional: { duration: duration, name: effect.name } })
            } else if (effect.type === 'elemental') {
                setBaddieStatus({ ...baddieStatus, elemental: { name: effect.name, duration: duration } })
            } else if (effect.type === 'physical') {
                let tempArray = [...baddieStatus.physical];
                tempArray.push({ name: effect.name, duration: duration });
                setBaddieStatus({ ...baddieStatus, physical: tempArray });
            }
        }

        // Determine if baddie should be moved, and set his coords if so.
        determineThrow();
        setBaddieHP(baddieHP - determineDamage());
        setPlayerHype(Math.min(playerHype + determineHype(), 100));
        // If there are multiple attacks queued and you didn't just do the last one, setup the next move:
        if (playerMovesInQueue.length > 1 && attackQueueIndexPosition < playerMovesInQueue.length - 1) {
            setAttackQueueIndexPosition(attackQueueIndexPosition + 1);
            setupNextAttack();
        } else {
            finalAttackSuccess();
        }
    }

    // One Effect to handle all the keys:
    React.useEffect(() => {
        // If you've failed, ensure the string is exactly zero, and dispatch to advance state AND declare an end to the reflex check):
        if (failStatus) {
            setTimeString('00:00.00');
            dispatch(setCombatPhase('specialEvent'));
            dispatch(stopReflexCheck());
        }
        // This whole effect will only fire until you have either failed or succeeded:
        if (!failStatus && !successStatus) {
            // Update time, and if you have a value for 'then', then start calculating delta T and using it to decrement the time left:
            setThen(now);
            const deltaT = (Number(then) > 0) ? (now - then) : 0;
            setTimeLeft(timeLeft - deltaT);
            // How to display the time string, using a method that seemed clever circa 1970:
            if (timeLeft > 10000) {
                setTimeString(`00:${(timeLeft / 1000).toFixed(2)}`)
            } else {
                setTimeString(`00:0${(timeLeft / 1000).toFixed(2)}`)
            }
            // Set failure status to true if time runs out:
            if (timeLeft <= 0) {
                setFailStatus(true);
            }
            const handleKeydown = ev => {
                if (!failStatus) {
                    setFailStatus(true);
                    // Check each key in the combo against the keydown event:
                    playerMovesInQueue[attackQueueIndexPosition].combos[combo].forEach((key, idx) => {
                        if (ev.code === `Key${key}`) {
                            // If the index of the event key is the current key, advance the sequence:
                            if (idx === currentKey) {
                                setCurrentKey(currentKey + 1);
                                setFailStatus(false);
                            }
                        }
                    })
                    setKeystrokes(keystrokes + 1);
                }
            };  // IF COMBO IS EXECUTED SUCCESSFULLY:
            if (playerMovesInQueue[attackQueueIndexPosition].combos[combo].length === currentKey && !failStatus) {
                attackSuccess();
            }
            window.addEventListener('keydown', handleKeydown);

            return () => {
                window.removeEventListener('keydown', handleKeydown);
            };
        }
    }, [now]);
    return (
        <Wrapper failure={failStatus} success={successStatus}>
            <Ticker progress={timeLeft / timeToPerform * 100} />
            <MoveHeader><i>MOVE: {playerMovesInQueue[attackQueueIndexPosition].name.toUpperCase()}</i></MoveHeader>
            <FlexDiv>
                <h4>KEYS:</h4>
                {playerMovesInQueue[attackQueueIndexPosition].combos[combo].map((key, idx) => {
                    return (
                        <KeyPad key={Math.random() * 10000000} done={idx < currentKey}>{key}</KeyPad>
                    )
                })}
            </FlexDiv>
        </Wrapper>
    )
};

const MoveHeader = styled.div`
    text-shadow: 2px 2px 2px black;
    font-weight: 700;
    margin-top: 12px;
    font-size: 20px;
    font-family: sans-serif;
`

const Ticker = styled.div`
    position: absolute;
    width: ${props => props.progress}%;
    height: 100%;
    bottom: 0px;
    left: 0px;
    background: orange;
    opacity: .5;
    transition: all .2s;
    z-index: -3;
`

const FlexDiv = styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Wrapper = styled.div`
    height: 200px;
    border: 2px solid black;
    position: absolute;
    z-index: 1000;
    bottom: 20px;
    right: calc(50% - 100px);
`;

const KeyPad = styled.div`
    border: 2px solid black;
    width: 20px;
    height: 20px;
    margin: 12px;
    background-color: ${(props) => props.done ? 'grey' : 'white'};
    box-shadow: ${(props) => props.done ? '0 0 0 0 white' : '2px 2px 4px 2px black'};
`

export default ReflexCheck;