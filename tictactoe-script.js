const board = document.getElementById('board');
const winnerMessage = document.getElementById('winnerMessage');
let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        winnerMessage.textContent = `Player ${currentPlayer} Wins! 🎉`;
        return;
    }

    if (boardState.every(cell => cell)) {
        winnerMessage.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = Array(9).fill(null);
    winnerMessage.textContent = '';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

board.addEventListener('click', handleClick);