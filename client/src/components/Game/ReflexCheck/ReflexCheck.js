import React from 'react';
import styled from 'styled-components';

// Args: move = the data object for the move, combo = integer for which of the 3 possible key combos, numPrevMoves = integer.
function ReflexCheck({ move, combo, numPrevMoves }) {
    // Reduce time depending on number of moves previously executed:
    const timeToPerform = move.time - (numPrevMoves * 0.1);
    // Keep track of current key index and number of keys pressed - reflex check ends as soon as a wrong key is pressed.:
    const [currentKey, setCurrentKey] = React.useState(0);
    const [keystrokes, setKeystrokes] = React.useState(0);
    // Replace this with a useSelector?
    const [failStatus, setFailStatus] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    // One Effect to handle all the keys:
    React.useEffect(() => {
        const handleKeydown = ev => {
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
        };
        if (move.combos[combo].length === currentKey && !failStatus) setSuccess(true);
        window.addEventListener('keydown', handleKeydown);
    
        return () => {
          window.removeEventListener('keydown', handleKeydown);
        };
      }, [keystrokes, currentKey]);
    return (
        <Wrapper>
            <h4>MOVE: {move.move}</h4>
            <h4>TIME: {timeToPerform}</h4>
            <h4>STATUS: {failStatus ? 'DEAD': success ? 'SUCCESS!!!' : 'ONGOING'}</h4>
            <h4>KEYS:</h4>
            {move.combos[combo].map((key, idx) => {
                return(
                    <KeyPad key={Math.random() * 10000000} done={idx < currentKey}>{key}</KeyPad>
                )
            })}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    height: 288px;
    width: 128px;
    border: 2px solid black;
    border-radius: 8px;
`;

const KeyPad = styled.div`
    border: 2px solid black;
    margin: 12px;
    background-color: ${(props) => props.done ? 'limegreen' : 'cyan'};
    box-shadow: ${(props) => props.done ? '0px 0px 10px 8px limegreen' : '0 0 0 0 white'};
`

export default ReflexCheck;