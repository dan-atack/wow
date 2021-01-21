import React from 'react';
import styled from 'styled-components';
import Character from './Character';
import Dialogue from './Dialogue';
import { useTime } from '../../../hooks/useTime';
import { frames } from '../../../data/frames.json';
import { useDispatch, useSelector } from 'react-redux';
import { setFrame } from '../../../actions';
import Gate from '../../../assets/gate.png';

function CutscenePrototype({ scene }) {
  const backgrounds = { gate: Gate };
  const dispatch = useDispatch();
  const currentFrame = useSelector((state) => state.game.frame);
  const frameData = frames[scene]
    ? frames[scene][`frame_${currentFrame}`] || {
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
  const now = useTime(frameData.duration ? frameData.duration : null);
  React.useEffect(() => {
    if (!frameData.last) dispatch(setFrame(currentFrame + 1));
  }, [now]);
  return (
    <Wrapper className='background' bg={backgrounds[frameData.background]}>
      <WIPHeader>WORK IN PROGRESS - CUTSCENE</WIPHeader>
      <Character avatar={frameData.character} characterPosition={frameData.characterPosition}/>
      <Dialogue text={frameData.text} />
    </Wrapper>
  );
}

const WIPHeader = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  opacity: 50%;
`

const Wrapper = styled.div`
  background: url(${(props) => props.bg}) no-repeat;
  background-size: 100%;
  transition-duration: 0.25s;
  width: 100%;
  height: 100vh;
  position: relative;
`;

export default CutscenePrototype;
