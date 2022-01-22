const x_player = 'x'
const o_player = 'o'

const WINNING_CONDITION = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
]

const board = document.getElementById('board')
const cellElement = document.querySelectorAll('.cell')
const winningMessage = document.getElementById('winning-message')
const resetButton = document.getElementById('reset-btn')

resetButton.addEventListener('click', startGame)

let circleTurn = true

startGame()

function startGame() {
   circleTurn = false
   cellElement.forEach(cell => {
      cell.classList.remove(x_player)
      cell.classList.remove(o_player)
      cell.classList.remove('invalid')
      cell.removeEventListener('click', handleClick)
      winningMessage.innerText = ""
      cell.addEventListener('click', handleClick, { once: true })
   })
}

function handleClick(e) {
   const cell = e.target
   const currentClass = circleTurn ? o_player : x_player
   placeMark(cell, currentClass)
   if (checkWin(currentClass)) {
      result(false)
      cellElement.forEach(cell => {
         cell.classList.add('invalid')
      })
   }
   else if (checkDraw()) {
      winningMessage.innerText = 'Bàn cờ đầy'
      result(true)
   }
   else
      swapTurn()
}

function placeMark(cell, currentClass) { cell.classList.add(currentClass) }

function swapTurn() { circleTurn = !circleTurn }

function checkDraw() {
   // return [...cellElement].every(cell => {
   //    return cell.classList.contains(x_player) || cell.classList.contains(o_player)
   // })
   for (let i = 0; i < 9; i++)
      if (!(cellElement[i].classList.contains(x_player)
         || cellElement[i].classList.contains(o_player)))
         return false
   return true
}

function checkWin(currentClass) {
   // return WINNING_CONDITION.some(condition => {
   //    return condition.every(index => {
   //       return cellElement[index].classList.contains(currentClass)
   //    })
   // })
   for (let i = 0; i < WINNING_CONDITION.length; i++) {
      let mark = WINNING_CONDITION[i]
      if (cellElement[mark[0]].classList.contains(currentClass) &&
         cellElement[mark[1]].classList.contains(currentClass) &&
         cellElement[mark[2]].classList.contains(currentClass)) {
         return true;
      }
   }
   return false;
}

function result(draw) {
   if (draw) {
      winningMessage.innerText = 'Bàn cờ đầy!'
   } else {
      let player = ""
      circleTurn ? player = "O" : player = "X"
      winningMessage.innerText = player + " win"
   }
}