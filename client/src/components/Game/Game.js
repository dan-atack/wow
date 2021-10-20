import React, { useState } from 'react';
import styled from 'styled-components';
import Cutscene from './Cutscene';
import Minigame from './Minigame';
import Customizer from './CustomizerPrototype';
import scenes from '../../data/scenes.json';
import CombatEnvironment from './CombatEnvironment';
import SelectCharacter from '../SelectCharacter/SelectCharacter';

function Game() {
  const [scene, setScene] = useState(0);

  // The game component will be the body of the game, will show a number of different UIs depending on what is going on in the game.
  // As to that, there will be a database-esque 'scenes' file containing a number of scripts that will be fed into the game module
  // to tell it what to show.

  // Next button handler function advances the scene:
  const handleAdvance = () => {
    // If there is a scene,

      // Move to the next scene:
      setScene(scene + 1);
  };

  const renderScene = (sceneName) => {
    switch (sceneName) {
      case 'characterSelect': 
        return <SelectCharacter scene={scene} setScene={setScene}/>
      case 'cutscene':
        return <Cutscene scene={scene} setScene={setScene}/>;
      case 'fight':
        return <AlignCenterDiv><CombatEnvironment/></AlignCenterDiv>;
      case 'minigame':
        return <Minigame setScene={setScene} scene={scene}/>;
      case 'customizer':
        return <Customizer />;
    }
  };
  
  return (
    <GameBody>
      {scenes[scene] && 
        renderScene(scenes[scene])
      }
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
