export const adjacent = (obstruction, playerCoords, setPlayerSkills, playerSkills, foundMove) => {
    let contextChecker = [];
    let found;

    contextChecker.push({x: obstruction.x + 1, y: obstruction.y})
    contextChecker.push({x: obstruction.x - 1, y: obstruction.y})
    contextChecker.push({y: obstruction.y + 1, x: obstruction.x})
    contextChecker.push({y: obstruction.y - 1, x: obstruction.x})
    
    if(contextChecker.find( context => context.y === playerCoords.y && context.x === playerCoords.x)) {
        found = true
    }
    if(found) setPlayerSkills([...playerSkills, foundMove]);
}

export const opponent_adjacent_then_player = (obstruction, playerCoords, baddieCoords, setPlayerSkills, playerSkills, foundMove) => {
    let contextChecker = [];

    contextChecker.push({x: obstruction.x + 1, y: obstruction.y})
    contextChecker.push({x: obstruction.x - 1, y: obstruction.y})
    contextChecker.push({y: obstruction.y + 1, x: obstruction.x})
    contextChecker.push({y: obstruction.y - 1, x: obstruction.x})

    let foundTile = contextChecker.find(context => {
      return context.y === baddieCoords.y && context.x === baddieCoords.x
    });

    if(!foundTile) return;

    let foundTileChecker = [];

    foundTileChecker.push({x: foundTile.x + 1, y: foundTile.y})
    foundTileChecker.push({x: foundTile.x - 1, y: foundTile.y})
    foundTileChecker.push({y: foundTile.y - 1, x: foundTile.x})
    foundTileChecker.push({y: foundTile.y - 1, x: foundTile.x})

    if(foundTileChecker.find(tile => tile.x === playerCoords.x && tile.y === playerCoords.y)) {
      setPlayerSkills([...playerSkills, foundMove]);
    }
}