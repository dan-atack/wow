import React from 'react';
import styled from 'styled-components';

// Args: move = the data object for the move, combo = integer for which of the 3 possible key combos, numPrevMoves = integer.
function ReflexCheck({ move, combo, numPrevMoves }) {
    // Reduce time depending on number of moves previously executed:
    const timeToPerform = move.time - (numPrevMoves * 0.1);
    // Prepare to render each Key cue individually:
    const [currentKey, setCurrentKey] = React.useState(0)
    // One Effect to handle all the keys:
    React.useEffect(() => {
        const handleKeydown = ev => {
            // Check each key in the combo against the keydown event:
            move.combos[combo].forEach((key, idx) => {
                if (ev.code === `Key${key}`) {
                    // If the index of the event key is the current key, advance the sequence:
                    if (idx === currentKey) {
                        setCurrentKey(currentKey + 1);
                    }
                }
            })
        //   switch (ev.code) {
        //     case `Key${move.combos[combo][0]}`:
        //         setKeyCompletes({...keyCompletes, key0: true});
        //         break;
        //     case `Key${move.combos[combo][1]}`:
        //         if (keyCompletes.key0) {
        //             setKeyCompletes({...keyCompletes, key1: true});
        //         } else {
        //             setKeyCompletes({...keyCompletes, warning: true})
        //         }
        //         break;
        //     case `Key${move.combos[combo][2]}`:
        //         setKeyCompletes({...keyCompletes, key2: true});
        //         break;
        //     case `Key${move.combos[combo][3]}`:
        //         setKeyCompletes({...keyCompletes, key3: true});
        //         break;
        //   }
        };
    
        window.addEventListener('keydown', handleKeydown);
    
        return () => {
          window.removeEventListener('keydown', handleKeydown);
        };
      });
    return (
        <Wrapper>
            <h4>MOVE: {move.move}</h4>
            <h4>TIME: {timeToPerform}</h4>
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
    height: 256px;
    width: 128px;
    border: 2px solid black;
    border-radius: 8px;
`;

const KeyPad = styled.div`
    border: 2px solid gray;
    background-color: ${(props) => props.done ? 'limegreen' : 'cyan'};
`

export default ReflexCheck;