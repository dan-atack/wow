import React from 'react';
import styled from 'styled-components';
import Overworld from './Overworld';
import MenuBar from './MenuBar';
// import CharacterDisplay from './CharacterDisplay';
import PlayerSetup from './PlayerSetup';
import StatusBars from './StatusBars';
import FightPrototype from './FightPrototype';
import CutscenePrototype from './CutscenePrototype';
import MinigamePrototype from './MinigamePrototype';
import { chapters, sentence } from '../../chapters/gameChapters';

function Game() {
  // The game component will be the body of the game, will show a number of different UIs depending on what is going on in the game.
  // As to that, there will be a database-esque 'scenes' file containing a number of scripts that will be fed into the game module
  // to tell it what to show.
  const [chapter, setChapter] = React.useState(0);
  const [scene, setScene] = React.useState(0);
  // Next button handler function advances the scene/chapter:
  const handleAdvance = () => {
    // all scenes will have a 'next' value to point to the next scene. The last scene in a chapter will have -1 as its next:
    if (
      chapters[`chapter_${chapter}`] &&
      chapters[`chapter_${chapter}`][`scene_${scene}`].next > 0
    ) {
      console.log('ping');
      setScene(chapters[`chapter_${chapter}`][`scene_${scene}`].next);
    } else {
      console.log('chapter ping');
      // if you're at the last scene, advance the chapter instead, and reset the scene counter:
      setChapter(chapter + 1);
      setScene(0);
    }
  };
  React.useEffect(() => {}, [chapter]);
  return (
    <GameBody>
      {chapters[`chapter_${chapter}`] ? (
        chapters[`chapter_${chapter}`][`scene_${scene}`].type === 'cutscene' ? (
          <CutscenePrototype
            words={chapters[`chapter_${chapter}`][`scene_${scene}`].name}
          />
        ) : chapters[`chapter_${chapter}`][`scene_${scene}`].type ===
          'fight' ? (
          <FightPrototype
            words={chapters[`chapter_${chapter}`][`scene_${scene}`].name}
          />
        ) : (
          <MinigamePrototype
            words={chapters[`chapter_${chapter}`][`scene_${scene}`].name}
          />
        )
      ) : (
        <h1>Game over man.</h1>
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
