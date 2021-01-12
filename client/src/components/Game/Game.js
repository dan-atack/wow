import React from 'react';
import styled from 'styled-components';
import Cutscene from './Cutscene';
import Minigame from './Minigame';
import Customizer from './CustomizerPrototype';
<<<<<<< HEAD
import { scenes } from '../../chapters/gameScenes';
import CombatEnvironment from './CombatEnvironment';
=======
import { scenes } from '../../data/scenes.json';
import CombatTestEnvironment from './EricTest';
>>>>>>> 1074efd2b4a816a382b57d5246fbff351e761484
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
        return <CombatEnvironment />;
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
      <button style={{ marginTop: 16 }} onClick={handleAdvance}>
        Next
      </button>
    </GameBody>
  );
}

const GameBody = styled.div`
  border: 3px solid limegreen;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  height: 90vh;
  grid-template-areas:
    'ui'
    'next';
  grid-template-rows: 11fr 0.8fr;
`;

export default Game;
