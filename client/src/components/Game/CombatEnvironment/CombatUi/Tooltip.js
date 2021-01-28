import React from 'react';
import styled from 'styled-components';

const Tooltip = ({skill}) => {
  const {
    baseDmg, 
    challengeType, 
    description, 
    id, 
    maxHype, 
    name, 
    range, 
    shape, 
    special, 
    time,
    icon
  } = skill;

  return (
    <Wrapper>
      <FlexDiv>
        {skill.icon && 
          <IconDiv>
            <img src={require(`../../../../assets/actionIcons/${skill.icon}`)} alt={skill.name}/>
          </IconDiv> 
          || <IconPlaceholder/>
        }
        <InfoDiv>
          <div>Move: {name}</div>
          <div>Range: {range}</div>
          <div>Type: {shape}</div>
          <div>Base Damage: {baseDmg}</div>
          { special && <div>chance to {special}</div>}
        </InfoDiv>
      </FlexDiv>
      <DescriptionDiv>{description}</DescriptionDiv>
    </Wrapper>
  )
}

const IconDiv = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid red;
  margin-right: 12px;
`

const InfoDiv = styled.div`
  text-align: left;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const DescriptionDiv = styled.div`
  text-align: justify;
  font-size: 8px;
`

const FlexDiv = styled.div`
  display: flex;
  margin-bottom: 12px;
`

const IconPlaceholder = styled.div`
  width: 50px;
  height: 50px;
  background: red;
  margin-right: 12px;
`

const Wrapper = styled.div`
  min-height: calc(120px - 24px);
  width: calc(250px - 24px);
  background: orange;
  color: red;
  border-radius: 2px solid black;
  position: absolute;
  top: -140px;
  left: 0px;
  box-shadow: 2px 2px 4px 2px rgb(0, 0, 0, 0.1);
  padding: 12px;
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  display: flex;
  flex-direction: column;
`

export default Tooltip