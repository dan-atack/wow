import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setKarma, setShowmanship, setMinigameRound } from '../../../../actions';

// buttons in the minigame will be fed a data object containing info such as text for the button, and the buttons' karma value.
function MinigameButton({ buttonData }) {
  const currentRound = useSelector((state) => state.game.minigameRound);
  const { id, axes, value, text } = buttonData;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (axes.includes('karmic')) {
      dispatch(setKarma(value));
    }
    if (axes.includes('showmanship')) {
      dispatch(setShowmanship(value));
    }
    // When this function runs it doesn't increment the current round; it just sets the 'update minigame' flag to true:
    dispatch(setMinigameRound(currentRound, true));
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
