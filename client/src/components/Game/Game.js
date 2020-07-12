import React from 'react';
import styled from 'styled-components';
import FightPrototype from './FightPrototype';
import CutscenePrototype from './CutscenePrototype';
import MinigamePrototype from './MinigamePrototype';
import Customizer from './CustomizerPrototype';
import { scenes } from '../../chapters/gameScenes';
import CombatTestEnvironment from './EricTest'

function Game() {
  // The game component will be the body of the game, will show a number of different UIs depending on what is going on in the game.
  // As to that, there will be a database-esque 'scenes' file containing a number of scripts that will be fed into the game module
  // to tell it what to show.
  const [scene, setScene] = React.useState(0);
  // Next button handler function advances the scene:
  const handleAdvance = () => {
    // If there is a scene,
    if (scenes[`scene_${scene}`]) {
      // Move to the next scene:
      console.log('ping');
      setScene(scene + 1);
    }
  };
  const renderScene = (sceneType) => {
    switch (sceneType) {
      case 'cutscene':
        return <CutscenePrototype />;
      case 'fight':
        return <CombatTestEnvironment />;
      case 'minigame':
        return <MinigamePrototype />;
      case 'customizer':
        return <Customizer />;
    }
  };
  return (
    <GameBody>
      {scenes[`scene_${scene}`] ? (
        renderScene(scenes[`scene_${scene}`].type)
      ) : (
        <> </>
      )}
      <button onClick={handleAdvance}>Next</button>
    </GameBody>
  );
}

const GameBody = styled.div`
  border: 3px solid limegreen;
  border-radius: 16px;
`;

export default Game;
