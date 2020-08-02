import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayerStats } from '../../../actions';

// In this preliminary character customization screen, we'll experiment with the idea of having a single currency
// that can either be spent on improving numerical stats, or buying new moves.
function CharacterDetails() {
  const dispatch = useDispatch();
  // Redux will be used to control the player's character type, as well as the stats and moves list:
  const characterType = useSelector((state) => state.player.characterType);
  console.log(characterType);
  const { playerDmg, playerEnd, playerAcr, playerItm } = useSelector(
    (state) => state.player
  );
  // Players are granted 15 skill points to spend on custom initial stats, and these will use local state to limit allocations:
  const [pts, setPts] = React.useState({ value: 15 });
  const [damageAllocation, setDamageAllocation] = React.useState({ value: 0 });
  const [enduranceAllocation, setEnduranceAllocation] = React.useState({
    value: 0,
  });
  const [acroAllocation, setAcroAllocation] = React.useState({
    value: 0,
  });
  const [itemsAllocation, setItemsAllocation] = React.useState({ value: 0 });
  // States for Ability Purchase Options:
  const [backBreaker, setBackBreaker] = React.useState(false);
  const [chokeSlam, setChokeSlam] = React.useState(false);
  const [dropkick, setDropkick] = React.useState(false);
  const [pileDriver, setPileDriver] = React.useState(false);

  const handleArchetype = (type) => {
    switch (type) {
      case 'High-Flier':
        return 'High-Fliers do relatively less damage but have the showiest, most acrobatic moves.';
      case 'Tank':
        return 'Tanks can take a lot of punishment and do good damage, but lack experience in an AGILE environment.';
      case 'SuperStar':
        return 'SuperStars are the most balanced and overall best kinds of fighters...';
    }
  };
  // Handler functions destribute points between various stats & abilities as they are spent.
  // The handlePoints function is the bank: all transactions are sent to it for approval:
  const handlePoints = (ev, skill) => {
    // for all transactions, make available only if there are sufficient ALLOCATABLE points, and disallow negative numbers:
    const prev = skill.value;
    const diff = Number(ev.target.value) - prev;
    if ((pts.value > 0 || diff < 0) && ev.target.value >= 0) {
      // if transaction is valid, adjust points total,
      setPts({ value: pts.value - diff });
      // and return the Difference (signed positive or negative) to be combined with the previous value and then DISPATCHED:
      return diff;
    } else {
      console.log('insufficient points/negative value attempted.');
      // otherwise return zero, since that is the amount of change you're allowed to get:
      return 0;
    }
  };
  // Controlled input handlers for stat adjustments:
  const handleDamage = (event) => {
    // Set value of damageAllocation state to the value of itself plus the outcome of the handlePoints fucntion (returns -1, 0 or +1):
    setDamageAllocation({
      value: damageAllocation.value + handlePoints(event, damageAllocation),
    });
  };
  const handleEndurance = (event) => {
    setEnduranceAllocation({
      value:
        enduranceAllocation.value + handlePoints(event, enduranceAllocation),
    });
  };
  const handleAcro = (event) => {
    setAcroAllocation({
      value: acroAllocation.value + handlePoints(event, acroAllocation),
    });
  };
  const handleItems = (event) => {
    setItemsAllocation({
      value: itemsAllocation.value + handlePoints(event, itemsAllocation),
    });
  };
  // TODO: Controlled inputs for purchasing moves

  // Submit button handler function: dispatches all allocated point values to the player's Redux state:
  const handleSubmit = () => {
    dispatch(
      setPlayerStats(
        damageAllocation.value,
        enduranceAllocation.value,
        acroAllocation.value,
        itemsAllocation.value
      )
    );
  };

  return (
    <Wrapper>
      <h2 style={{ gridArea: 'head' }}>Player Class: {characterType}</h2>
      <h3 style={{ gridArea: 'desc' }}>{handleArchetype(characterType)}</h3>
      <h3 style={{ gridArea: 'choose' }}>
        Choose Your Skills: ({pts.value} Points Remaining)
      </h3>
      <SkillBox style={{ gridArea: 'stats' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <h3>Stats:</h3>
          <h3>Points Allocated:</h3>
        </div>
        <Skill>
          <span>Damage: {playerDmg + damageAllocation.value}</span>
          <Adjuster
            type='number'
            value={damageAllocation.value}
            onChange={handleDamage}
          />
        </Skill>
        <Skill>
          Endurance: {playerEnd + enduranceAllocation.value}
          <Adjuster
            type='number'
            value={enduranceAllocation.value}
            onChange={handleEndurance}
          />
        </Skill>
        <Skill>
          Acrobatics: {playerAcr + acroAllocation.value}
          <Adjuster
            type='number'
            value={acroAllocation.value}
            onChange={handleAcro}
          />
        </Skill>
        <Skill>
          Item Use: {playerItm + itemsAllocation.value}
          <Adjuster
            type='number'
            value={itemsAllocation.value}
            onChange={handleItems}
          />
        </Skill>
      </SkillBox>
      <SkillBox style={{ gridArea: 'abilities' }}>
        <h3>Abilities</h3>
        <Ability>Back Breaker</Ability>
        <Ability>Choke Slam</Ability>
        <Ability>Drop Kick</Ability>
        <Ability>Pile Driver</Ability>
      </SkillBox>
      <Link to='/game'>
        <button style={{ gridArea: 'select' }} onMouseUp={handleSubmit}>
          Confirm Selection?
        </button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 2px solid white;
  border-radius: 8px;
  margin: 8px;
  padding: 8px;
  display: grid;
  grid-template-areas:
    'head head'
    'desc desc'
    'choose choose'
    'stats abilities';
`;

const SkillBox = styled.div`
  border: 2px solid white;
  border-radius: 8px;
  margin: 4px;
  padding: 4px;
  font-size: 20px;
`;

const Skill = styled.div`
  border: 2px solid limegreen;
  border-radius: 6px;
  margin: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 20px;
`;

const Adjuster = styled.input`
  border: 1px solid blue;
  border-radius: 6px;
  background-color: black;
  color: limegreen;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
`;

const Ability = styled.div`
  border: 1px solid magenta;
  border-radius: 6px;
  height: 14%;
  margin: 6px;
  &:hover {
    box-shadow: 0 0 8px 8px magenta;
  }
`;

const Increase = styled.button`
  border: 2px solid whitesmoke;
  border-radius: 12px;
  background-color: limegreen;
`;
const Decrease = styled.button`
  border: 2px solid whitesmoke;
  border-radius: 12px;
  background-color: red;
`;

export default CharacterDetails;
