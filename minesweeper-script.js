const gridSize = 9;
const mineCount = 10;
let grid = [];
let isGameOver = false;
let flagsLeft = mineCount;

function createGame() {
  const container = document.getElementById("game-container");
  container.innerHTML = ""; // Clear previous game
  grid = Array(gridSize).fill().map(() => Array(gridSize).fill({}));

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => handleClick(row, col));
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        addFlag(row, col);
      });
      container.appendChild(cell);
      grid[row][col] = { mine: false, opened: false, flagged: false, element: cell };
    }
  }

  placeMines();
  updateFlagsCount();
}

function placeMines() {
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    if (!grid[row][col].mine) {
      grid[row][col].mine = true;
      minesPlaced++;
    }
  }
}

function handleClick(row, col) {
  if (isGameOver || grid[row][col].opened || grid[row][col].flagged) return;
  const cell = grid[row][col];
  
  if (cell.mine) {
    cell.element.classList.add("mine");
    endGame("You hit a mine! Game Over.");
    return;
  }

  openCell(row, col);
  if (checkWin()) endGame("Congratulations! You've cleared the mines!");
}

function openCell(row, col) {
  if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return;
  const cell = grid[row][col];
  if (cell.opened || cell.mine || cell.flagged) return;

  cell.opened = true;
  cell.element.classList.add("opened");

  const adjacentMines = countAdjacentMines(row, col);
  if (adjacentMines > 0) {
    cell.element.textContent = adjacentMines;
  } else {
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        openCell(r, c);
      }
    }
  }
}

function addFlag(row, col) {
  if (isGameOver) return;

  const cell = grid[row][col];
  if (cell.opened) return;

  if (cell.flagged) {
    cell.flagged = false;
    cell.element.classList.remove("flag");
    cell.element.textContent = "";
    flagsLeft++;
  } else if (flagsLeft > 0) {
    cell.flagged = true;
    cell.element.classList.add("flag");
    cell.element.textContent = "🚩";
    flagsLeft--;
  }
  updateFlagsCount();
}

function countAdjacentMines(row, col) {
  let count = 0;
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize && grid[r][c].mine) {
        count++;
      }
    }
  }
  return count;
}

function updateFlagsCount() {
  document.querySelector("h1").textContent = `Minesweeper - Flags left: ${flagsLeft}`;
}

function endGame(message) {
  isGameOver = true;
  alert(message);
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col].mine) {
        grid[row][col].element.classList.add("mine");
      }
    }
  }
}

function checkWin() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (!grid[row][col].mine && !grid[row][col].opened) {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  isGameOver = false;
  flagsLeft = mineCount;
  createGame();
}

window.onload = createGame;
