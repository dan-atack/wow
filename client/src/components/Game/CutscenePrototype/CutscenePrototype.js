import React from 'react';
import styled from 'styled-components';
import Character from './Character';
import Dialogue from './Dialogue';
import { useTime } from '../../../hooks/useTime';
import { cutsceneFrames } from '../../../chapters/gameScenes';
import { useDispatch, useSelector } from 'react-redux';
import { setFrame } from '../../../actions';
import Gate from '../../../assets/gate.png';

function CutscenePrototype({ scene }) {
  const backgrounds = { gate: Gate };
  const dispatch = useDispatch();
  const currentFrame = useSelector((state) => state.game.frame);
  const frameData = cutsceneFrames[scene]
    ? cutsceneFrames[scene][`frame_${currentFrame}`] || {
        character: null,
        background: null,
        text: 'end of cutscene',
        duration: 10000,
      }
    : {
        character: null,
        background: null,
        text: 'end of cutscene',
        duration: 10000,
      };
  var now = useTime(frameData.duration ? frameData.duration : null);
  React.useEffect(() => {
    if (!frameData.last) dispatch(setFrame(currentFrame + 1));
  }, [now]);
  return (
    <Wrapper className='background' bg={backgrounds[frameData.background]}>
      <h1>CUTSCENE</h1>
      <Character avatar={frameData.character} />
      <Dialogue text={frameData.text} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  grid-area: ui;
  margin: 4% 8%;
  border: 2px solid black;
  background: url(${(props) => props.bg}) no-repeat;
  background-size: 100%;
  border: 3px solid green;
  border-radius: 12px;
  transition-duration: 0.25s;
`;

export default CutscenePrototype;
