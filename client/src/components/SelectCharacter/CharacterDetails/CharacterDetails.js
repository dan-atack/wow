import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// In this preliminary character customization screen, we'll experiment with the idea of having a single currency
// that can either be spent on improving numerical stats, or buying new moves.

function CharacterDetails() {
  // Grab the character type from redux; use to obtain initial stats and description:
  const characterType = useSelector((state) => state.player.characterType);
  // Players will be granted 15 skill points to spend at the outset of their careers:
  const [pts, setPts] = React.useState({ value: 15 });
  // Local state will be used initially to control the various input components as players choose their character balances:
  const [damage, setDamage] = React.useState({ value: 0 });
  const [endurance, setEndurance] = React.useState({ value: 0 });
  const [acro, setAcro] = React.useState({ value: 0 });
  const [items, setItems] = React.useState({ value: 0 });
  // States for Ability Purchase Options:
  const [backBreaker, setBackBreaker] = React.useState(false);
  const [chokeSlam, setChokeSlam] = React.useState(false);
  const [dropkick, setDropkick] = React.useState(false);
  const [pileDriver, setPileDriver] = React.useState(false);
  // handleArchetype function uses statBoosts variable to adjust initial stats and provide description based on player class:
  let statBoosts = { damage: 0, endurance: 0, acro: 0, items: 0 };
  const handleArchetype = (type) => {
    switch (type) {
      case 'High-Flier':
        statBoosts.damage = 2;
        statBoosts.endurance = 1;
        statBoosts.acro = 3;
        return 'High-Fliers do relatively less damage but have the showiest, most acrobatic moves.';
      case 'Tank':
        statBoosts.damage = 3;
        statBoosts.endurance = 3;
        return 'Tanks can take a lot of punishment and do good damage, but lack experience in an AGILE environment.';
      case 'SuperStar':
        statBoosts.damage = 3;
        statBoosts.endurance = 2;
        statBoosts.acro = 1;
        statBoosts.items = 1;
        return 'SuperStars are the most balanced and overall best kinds of fighters. .';
    }
  };
  // Handler functions destribute 'points' between various stats & abilities as they are spent:
  const handlePoints = (ev, skill) => {
    // for all transactions, make available only if there are sufficient points, and disallow negative numbers:
    const prev = skill.value;
    const diff = Number(ev.target.value) - prev;
    if ((pts.value > 0 || diff < 0) && ev.target.value >= 0) {
      // if transaction is valid, adjust points total,
      setPts({ value: pts.value - diff });
      // and return the requested new value:
      return Number(ev.target.value);
    } else {
      console.log('insufficient points/negative value attempted.');
      // otherwise return the CURRENT value (don't allow change):
      return skill.value;
    }
  };
  // Controlled input handlers for stat adjustments:
  const handleDamage = (event) => {
    setDamage({ value: handlePoints(event, damage) });
  };
  const handleEndurance = (event) => {
    setEndurance({ value: handlePoints(event, endurance) });
  };
  const handleAcro = (event) => {
    setAcro({ value: handlePoints(event, acro) });
  };
  const handleItems = (event) => {
    setItems({ value: handlePoints(event, items) });
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
          <span>Damage: {damage.value + statBoosts.damage}</span>
          <Adjuster
            type='number'
            value={damage.value}
            onChange={handleDamage}
          />
        </Skill>
        <Skill>
          Endurance: {endurance.value + statBoosts.endurance}
          <Adjuster
            type='number'
            value={endurance.value}
            onChange={handleEndurance}
          />
        </Skill>
        <Skill>
          Acrobatics: {acro.value + statBoosts.acro}
          <Adjuster type='number' value={acro.value} onChange={handleAcro} />
        </Skill>
        <Skill>
          Item Use: {items.value + statBoosts.items}
          <Adjuster type='number' value={items.value} onChange={handleItems} />
        </Skill>
      </SkillBox>
      <SkillBox style={{ gridArea: 'abilities' }}>
        <h3>Abilities</h3>
        <Ability>Back Breaker</Ability>
        <Ability>Choke Slam</Ability>
        <Ability>Drop Kick</Ability>
        <Ability>Pile Driver</Ability>
      </SkillBox>
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

export default CharacterDetails;
