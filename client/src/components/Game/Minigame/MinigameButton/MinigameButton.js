import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import minigameState from '../../../../state'

// buttons in the minigame will be fed a data object containing info such as text for the button, and the buttons' karma value.
function MinigameButton({ buttonData }) {
  const [karma, setKarma] = useRecoilState(minigameState.karma);
  const [showmanship, setShowmanship] = useRecoilState(minigameState.showmanship);
  const [updateRound, setUpdateround] = useRecoilState(minigameState.updateRound)

  const { id, axes, value, text } = buttonData;
  const handleClick = () => {
    if (axes.includes('karmic')) {
      setKarma(karma + value);
    }
    if (axes.includes('showmanship')) {
      setShowmanship(showmanship + value);
    }
    // When this function runs it doesn't increment the current round; it just sets the 'update minigame' flag to true:
    setUpdateround(true);
  };
  return (
    <Clicker onMouseUp={() => handleClick()}>
      {text}
    </Clicker>
  );
}

const Clicker = styled.button`
  height: 100%;
  width: 100%;
  background-color: black;
  color: white;
  font-size: 1em;
  text-align: left;
  padding: 10px;
  border: none;
  cursor: pointer;
  :hover {
    background: grey;
  }
`;

export default MinigameButton;
