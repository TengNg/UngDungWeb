let turn = 0
let finished = false

createBoard()

function createBoard() {

    board = new Array();

    for (let i = 0; i < 9; i++)
        board[i] = ''

    boardWinningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

}

function checkWinner(player) {
    // for (let i = 0; i < boardWinningCondition.length; i++) {
    //     let mark = boardWinningCondition[i]
    //     if (board[mark[0]] == player
    //         && board[mark[1]] == player
    //         && board[mark[2]] == player) {
    //         document.getElementById('kq').textContent = player + " thắng"
    //         return true
    //     }
    // }
    // return false
    return boardWinningCondition.some(condition => {
        return condition.every(index => {
            return board[index] == player
        })
    })
}

$(document).ready(() => {
    createBoard();
    $('canvas').click((e) => {
        if (finished == true) return
        canvasId = e.target.getAttribute('id')
        canvasObj = document.getElementById(canvasId)
        context = canvasObj.getContext("2d")
        canvasNumber = Number(canvasId.substr(canvasId.length - 1))
        if (board[canvasNumber] == '') {
            if (turn % 2 == 0) {
                // draw x
                context.moveTo(10, 10)
                context.lineTo(40, 40)
                context.moveTo(40, 10)
                context.lineTo(10, 40)
                context.strokeStyle = "blue"
                context.lineWidth = 4
                context.stroke()
                board[canvasNumber] = "X"
            } else {
                // draw o
                context.fillStyle = "white";
                context.fillRect(0, 0, 50, 50);
                context.beginPath();
                context.arc(25, 25, 20, 0, 2 * Math.PI);
                context.strokeStyle = "red";
                context.lineWidth = 4
                context.stroke();
                board[canvasNumber] = "O"
            }
            turn++
            let currentPlayer = board[canvasNumber]
            finished = checkWinner(currentPlayer)
            if (finished) {
                document.getElementById('kq').textContent = currentPlayer + " thắng"
                return
            }
            if (turn == 9) {
                document.getElementById('kq').textContent = "Bàn cờ đầy"
                fnished = true
            }
        }
    })
    $('#reset-btn').click(() => {
        location.reload()
    })
})