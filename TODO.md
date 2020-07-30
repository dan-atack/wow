In order to make the game fully playable in the combat system we need it to be clean and structured, as well as modular and reusable. Right now we're beginning to understand the scope of how the systems in the battle systems are going to work.

1) MAP GENERATION - 10% complete

The map generation should be a helper that receives a seed based on what the current state of the map/level is.

There should be a level generator helper
there should be a data file of levels

Global state: Level

Seed should recieve: width, height, obstructions, player position and enemy position.

2) MOVEMENT - 50% complete - (waiting on dan to finish character)

movement should take the amount of action points that a character has and create a radial of applicable moves - COMPLETE

There should be some sort of animation - NEED TO FIGURE OUT

3) COMBAT - 5% complete

combat engine will pass the move, it's name, it's effect, it's value(?) and it's pathfinding formula to the movement helper.

A function called attackRange() will receive that and return an array of all the spaces that fall within the attack's range.

onClicking a space where it overlaps with an enemy, the action mini game will commence  (note action mini game currently at 0%)

depending on the outcome of the turn there will be a formula applied to the damage.

4) TURN SYSTEM - 5% complete

The game loop will have to work with a specific turn system for:
- players movement
- players action
- enemies movement
- enemies action

- initial state
- special event state

players should also be able to undo their movement action if they choose the wrong space, so the players previous position must be saved.

This can all be done on a local state based on the encounter, potentially have a helper for the game loop

5) combat minigame - 0%

the combat minigame will vary in type of minigame by the categorization of the move

the move complexity depends on how difficult(efficient/strong) the move is and also in what order the move is on the move queue.

there will be a minigame component and helper file, the minigame component will be a screen that animates the action inside for either a pass fail state based on the action command. If an action fails, your deck of moves that are queued will not be completed and you will take a penalty to the type of damage you're dealing. 

(potentially we can have an enemy where if you fail an action command they counter you or a mode that hurts you if you fail to fulfill your action command)

6) enemy AI - 0% 

An enemy is simply an object with different values for the set data, including:
 how many action points they move a turn
 what sort of movement algorithm they use
 what attacks do they have?
 what sort of tells do they have?

  POTENTIAL EXPERIMENTAL GAME LOOP {
    on the enemies turn they will move based on their movement algorithm,
    on their action there will be some sort of tell on what kind of attack they're going to do
    player gets their turn to move and dodge out of the way of the attack
    then the ai action will go off
    then the player will get their action
  }

7) ASSETS AND ANIMATIONS - 0% lol this game is gonna be stick figures on god