import React, {useState} from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';


const SkillButton = (props) => {
  const {skill, handleClick} = props;
  const [open, setOpen] = useState(false);

  return (
    <Wrapper 
      onClick={() => handleClick(skill)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {skill.icon && <img src={require(`../../../../assets/actionIcons/${skill.icon}`)} alt={skill.name}/> || skill.name}
      {open && <Tooltip skill={skill}/>}
    </Wrapper>
  )
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