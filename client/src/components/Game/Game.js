import React from 'react';
import styled from 'styled-components';
import Cutscene from './Cutscene';
import Minigame from './Minigame';
import Customizer from './CustomizerPrototype';
import { scenes } from '../../data/scenes.json';
import CombatEnvironment from './CombatEnvironment';
import { useDispatch, useSelector } from 'react-redux';
import { setScene } from '../../actions';

function Game() {
  const dispatch = useDispatch();
  const scene = useSelector((state) => state.game.scene);
  // The game component will be the body of the game, will show a number of different UIs depending on what is going on in the game.
  // As to that, there will be a database-esque 'scenes' file containing a number of scripts that will be fed into the game module
  // to tell it what to show.
  // Next button handler function advances the scene:
  const handleAdvance = () => {
    // If there is a scene,
    if (scenes[`scene_${scene}`]) {
      // Move to the next scene:
      dispatch(setScene(scene + 1));
    }
  };
  const renderScene = (scene) => {
    switch (scene.type) {
      case 'cutscene':
        return <Cutscene scene={scene.name} />;
      case 'fight':
        return <AlignCenterDiv><CombatEnvironment /></AlignCenterDiv>;
      case 'minigame':
        return <Minigame />;
      case 'customizer':
        return <Customizer />;
    }
  };
  return (
    <GameBody>
      {scenes[`scene_${scene}`] ? (
        renderScene(scenes[`scene_${scene}`])
      ) : (
        <> </>
      )}
      {scene !== 3 &&
        <NextButton onClick={handleAdvance}>
          <i>SKIP &gt;&gt;&gt;</i>
        </NextButton>
      }
    </GameBody>
  );
}

const AlignCenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NextButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: none;
  color: white;
  text-shadow: 2px 2px 2px black;
  font-weight: 700;
  font-family: sans-serif;
`

const GameBody = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export default Game;
