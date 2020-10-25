1) baddieMoveLogic

baddieMoveLogic is a self explanatory title to a complex set of algorithms that dictate the way that the "baddie" moves.

most importantly baddieMoveLogic depends on the logic from the baddie.json data library. That's where all the attacks, moves and events will live.

* - orientationFinder - *

baddieMoveLogic will begin by trying to figure out where the baddie is in relation to the player. To do this it will call the orientation
finder, which by subtracting the player position's x and y coordinate by the baddie's x and y coordinate will return what cardinal
directions the player is from the enemy

example, if the player is on
  x: 6 y: 4 

and the baddie is on
  x: 5 y: 10

orientationFinder will check the subtracted x and y values of
  x: 1 y: -6

and return the value: 
  ['east', 'north']

A bit into the nitty gritty:

  if x > 0 then the player is to the east of the baddie and "east" will be pushed to the array
  if x < 0 then the player is to the west of the baddie and "west" will be pushed to the array  
  if x === 0 then the player is directly north or south of the baddie and "nothing" will be pushed to the array
  
  if y > 0 then the player is to the south of the baddie and "south" will be pushed to the array
  if y < 0 then the player is to the north of the baddie and "north" will be pushed to the array
  if y === 0 then the player is to the east or the west of the baddie and "nothing" will be pushed to the array

* - possibleEnemyPaths - *

After the helper has received the orientation, the helper function will call possibleEnemyPaths, a function made using djikstra's algorithm to figure out all the possible endpoints based on the 'actionPoints' of the specific baddie in the baddie.json library.

how it works is that the space where the baddie begins is the first "solved" space of the possibleMoves array. for every 1 numerical value of 'actionPoints' the solved space will propagate in all 4 cardinal directions turning them into a solved space, unless the space is out of bounds or is obstructed.

for every solved space, the algorithm will stop and look at every value and check to see if the value already exists in 'possibleMoves', if it does not, then it will add the value to 'possibleMoves'

possible enemy paths will return 'possibleMoves' back to the helper function as the value possibleArray

if the enemy has 3 action points and starts at x: 5 y: 10

[
  0: {x: 5, y: 10}
  1: {x: 4, y: 10}
  2: {x: 6, y: 10}
  3: {y: 9, x: 5}
  4: {x: 3, y: 10}
  5: {y: 9, x: 4}
  6: {x: 7, y: 10}
  7: {y: 9, x: 6}
  8: {y: 8, x: 5}
  9: {x: 2, y: 10}
  10: {y: 9, x: 3}
  11: {y: 8, x: 4}
  12: {x: 8, y: 10}
  13: {y: 9, x: 7}
  14: {y: 8, x: 6}
  15: {y: 7, x: 5}
]

* - Move Finder - *

After the 

// figure out a way to revert back to the movement turn from the players action phase and have a persistant amount of action points between them.

