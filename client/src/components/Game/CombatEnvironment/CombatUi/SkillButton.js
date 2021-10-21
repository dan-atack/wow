import React, {useState} from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';
import combatState from '../../../../state';
import { useRecoilValue, useRecoilState } from 'recoil';
// Game constants:
import { CONSTANTS } from '../../../../constants.js';

const SkillButton = (props) => {
  const { skill, handleClick, numPrevMoves, playerHype } = props;
  const [open, setOpen] = useState(false);
  const costModifier = (numPrevMoves - 1) * CONSTANTS.BASELINE_HYPE_COST  // hype cost is increased by num of previous moves
  const currentHypeCost = skill.hypeCost + costModifier;
  const affordable = playerHype >= currentHypeCost; // If player hype equals or exceeds the current cost, you can afford this move.

  if (affordable) {
    return (
      // This returns the button representing an attack option for the player.
      // Hype cost is equal to the baseline cost times the amount of attacks already selected (the first one is free though)
      // E.G. 1st attack = 0 hype, 2nd attack = 10 hype, 3rd attack = 30 hype, etc.
      <Wrapper 
        onClick={() => handleClick(skill, currentHypeCost)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {skill.icon && <img src={require(`../../../../assets/actionIcons/${skill.icon}`)} alt={skill.name}/> || skill.name}
        {open && <Tooltip skill={skill} costModifier={costModifier}/>}
      </Wrapper>
    )
  } else {
    return (
      <Wrapper
      style={{ backgroundColor: 'gray' }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {skill.icon && <img src={require(`../../../../assets/actionIcons/${skill.icon}`)} alt={skill.name}/> || skill.name}
        {open && <Tooltip skill={skill} costModifier={costModifier}/>}
      </Wrapper>
    )
  }
  
}

const Wrapper = styled.div`
  height: 50px;
  width: 50px;
  outline: 3px solid red;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  cursor: pointer;
  position: relative;
`

export default SkillButton