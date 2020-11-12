import React from 'react';
import styled from 'styled-components';

function ReflexCheck({ move, combo, numPrevMoves }) {
    // Reduce time depending on number of moves previously executed:
    const timeToPerform = move.time - (numPrevMoves * 0.1);
    // Prepare to render each Key cue individually:
    const [keyCompletes, setKeyCompletes] = React.useState({
        Key0: false,
        Key1: false,
        Key2: false,
        Key3: false,
    })
    // One Effect to handle all the keys:
    React.useEffect(() => {
        const handleKeydown = ev => {
          switch (ev.code) {
            case `Key${move.combos[combo][0]}`:
                setKeyCompletes({...keyCompletes, Key0: true});
                break;
            case `Key${move.combos[combo][1]}`:
                setKeyCompletes({...keyCompletes, Key1: true});
                break;
            case `Key${move.combos[combo][2]}`:
                setKeyCompletes({...keyCompletes, Key2: true});
                break;
            case `Key${move.combos[combo][3]}`:
                setKeyCompletes({...keyCompletes, Key3: true});
                break;
          }
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
                    <KeyPad key={Math.random() * 10000000} done={keyCompletes[`Key${idx}`]}>{key}</KeyPad>
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