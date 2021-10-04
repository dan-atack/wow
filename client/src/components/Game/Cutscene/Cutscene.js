import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Character from './Character';
import Dialogue from './Dialogue';
import { useTime } from '../../../hooks/useTime';
import { frames } from '../../../data/frames.json';
import globalState from '../../../state';

import { useRecoilState } from 'recoil';

function CutscenePrototype({scene, setScene}) {
  const [ response, setResponse ] = useState('')
  const [frame, setFrame] = useState(0);

  const [ level, setLevel ] = useRecoilState(globalState.level)

  const frameData = frames[level]
    ? frames[level][`frame_${frame}`] || {
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

  useEffect(() => {
    if (!frameData.last) setFrame(frame + 1);
  }, [now]);

  useEffect(() => {
    if(frameData.last === true) {
      setScene(scene + 1);
    }
  }, [frame])

  const advanceScene = () => {
    if(frameData.last) return;
    setFrame(frame + 1);
  };

  const advanceSceneOnClick = () => {
    if(frameData.last || frameData.option) return;
    setFrame(frame + 1);
  }

  const responseHandler = (textData) => {
    let text = textData
    if (response !== '') {
      text = response;
    }
    return text
  }

  return (
    <Wrapper className='background' onClick={advanceSceneOnClick}>
      <Background src={require(`../../../assets/backgrounds/${frameData.background}.png`)} alt='background scene'/>
      <WIPHeader>WORK IN PROGRESS - CUTSCENE</WIPHeader>
      <Character avatar={frameData.character} characterPosition={frameData.characterPosition} background={frameData.backgroundColor}/>
      <Dialogue advanceScene={advanceScene} text={responseHandler(frameData.text)} type={frameData.type} option={frameData.option} response={response} setResponse={setResponse}/>
    </Wrapper>
  );
}

const Background = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
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
