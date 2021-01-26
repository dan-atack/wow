import React from 'react';
import styled from 'styled-components';
import { useTime } from '../../../hooks/useTime';
import { useDispatch } from 'react-redux';
import { setCombatPhase, stopReflexCheck } from '../../../actions';

// Args: move = the data object for the move, combo = integer for which of the 3 possible key combos, numPrevMoves = integer.
function ReflexCheck({ move, combo, numPrevMoves }) {
    const dispatch = useDispatch();
    // Update time at very short interval to 'sample' for updates at high frequency:
    let now = useTime(20);
    const [then, setThen] = React.useState(0);
    // Reduce time by ten percent per number of moves previously executed:
    const timeToPerform = move.time * (1 - numPrevMoves * 0.1);
    // Then keep track of the time remaining in state:
    const [timeLeft, setTimeLeft] = React.useState(timeToPerform);
    const [timeString, setTimeString] = React.useState('00:00.00');
    // Keep track of current key index and number of keys pressed - reflex check ends as soon as a wrong key is pressed.:
    const [currentKey, setCurrentKey] = React.useState(0);
    const [keystrokes, setKeystrokes] = React.useState(0);
    // Replace this with a useSelector?
    const [failStatus, setFailStatus] = React.useState(false);
    const [successStatus, setSuccessStatus] = React.useState(false);
    // One Effect to handle all the keys:
    React.useEffect(() => {
        // If you've failed, ensure the string is exactly zero, and dispatch to advance state AND declare an end to the reflex check):
        if (failStatus) {
            setTimeString('00:00.00');
            console.log('Reflex check failed... spectacularly!');
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
                setTimeString(`00:${(timeLeft/1000).toFixed(2)}`)
            } else {
                setTimeString(`00:0${(timeLeft/1000).toFixed(2)}`)
            }
            // Set failure status to true if time runs out:
            if (timeLeft <= 0) {
                setFailStatus(true);
            }
            const handleKeydown = ev => {
                if (!failStatus) {
                    setFailStatus(true);
                    // Check each key in the combo against the keydown event:
                    move.combos[combo].forEach((key, idx) => {
                    if (ev.code === `Key${key}`) {
                        // If the index of the event key is the current key, advance the sequence:
                        if (idx === currentKey) {
                            setCurrentKey(currentKey + 1);
                            // Usedispatch?
                            setFailStatus(false);
                        }
                    }
                })
                setKeystrokes(keystrokes + 1);
                }
            };
            if (move.combos[combo].length === currentKey && !failStatus) {
                setSuccessStatus(true);
                dispatch(setCombatPhase('specialEvent'));
                dispatch(stopReflexCheck());
                console.log('Reflex check successful! Yay!');
            } 
            window.addEventListener('keydown', handleKeydown);
        
            return () => {
            window.removeEventListener('keydown', handleKeydown);
            };
        }  
    }, [now]);
    return (
        <Wrapper failure={failStatus} success={successStatus}>
            <Ticker progress={timeLeft/timeToPerform * 100}/>
            <MoveHeader><i>MOVE: {move.name.toUpperCase()}</i></MoveHeader>
            <FlexDiv>
            <h4>KEYS:</h4>
                {move.combos[combo].map((key, idx) => {
                    return(
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
    bottom: 20px;
    right: 20px;
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