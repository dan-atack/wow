import React from 'react';
import styled from 'styled-components';
import Character from './Character';
import Dialogue from './Dialogue';
import { useTime } from '../../../hooks/useTime';
import { frames } from '../../../data/frames.json';
import { useDispatch, useSelector } from 'react-redux';
import { setFrame } from '../../../actions';

function CutscenePrototype({ scene }) {
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
  const advanceScene = () => {
    dispatch(setFrame(currentFrame + 1));
  };
  return (
    <Wrapper className='background' >
      <Background src={require(`../../../assets/backgrounds/${frameData.background}.png`)} alt='background scene'/>
      <WIPHeader>WORK IN PROGRESS - CUTSCENE</WIPHeader>
      <Character avatar={frameData.character} characterPosition={frameData.characterPosition}/>
      <Dialogue advanceScene={advanceScene} text={frameData.text} type={frameData.type} option={frameData.option}/>
    </Wrapper>
  );
}

const Background = styled.img`
  width: 100%;
  height: 100vh;
`

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
