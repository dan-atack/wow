const movementFinder = (target, playerPOS) => {

  const movementX = playerPOS.x - target.x;
  const movementY = playerPOS.y - target.y;
  
  const movement = {x: movementX, y: movementY};
  return movement
} 

const timeOutCalculator = (movement) => {
  const {x, y} = movement;
  let totalTime = 0;
  let isTurn = false
  if(x && y) {
    totalTime += 50;
    isTurn = true
  }
  totalTime += ((Math.abs(x) * 50) + (Math.abs(y) * 50))
  const yTime = Math.abs(y) * 50;
  const xTime = Math.abs(x) * 50;
  return {totalTime: totalTime, xTime: xTime, yTime: yTime, isTurn: isTurn, movement: movement}
}

export const movementTimeout = (target, playerPOS) => { //player pos will likely be taken from a reducer
  const movement = movementFinder(target, playerPOS)
  console.log(movement)
  const turnTime = timeOutCalculator(movement)

  return turnTime
}

export const sleep = (duration) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, duration * 1000)
	})
}