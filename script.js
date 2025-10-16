const GRID_SIZE = 8;
const NUM_MINES = 10;
const gameGrid = document.getElementById('game-grid');
const messageH1 = document.getElementById('game-message');

let board = []; // 2D array of objects {isMine: boolean, minesAround: number, isRevealed: boolean, element: DOM_Node}
let isGameOver = false;

// Initialize Game
function initializeGame() {
    gameGrid.innerHTML = ''; // Clear existing grid
    messageH1.textContent = ''; // Clear message
    isGameOver = false;
    board = []; // Reset board

    // Create board structure and DOM elements
    for (let r = 0; r < GRID_SIZE; r++) {
        board[r] = [];
        for (let c = 0; c < GRID_SIZE; c++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = r;
            cellElement.dataset.col = c;
            cellElement.addEventListener('click', () => handleClick(r, c));
            gameGrid.appendChild(cellElement);

            board[r][c] = {
                isMine: false,
                minesAround: 0,
                isRevealed: false,
                element: cellElement
            };
        }
    }

    placeMines();
    calculateMinesAround();
}

// Place Mines randomly on the board
function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const r = Math.floor(Math.random() * GRID_SIZE);
        const c = Math.floor(Math.random() * GRID_SIZE);

        if (!board[r][c].isMine) {
            board[r][c].isMine = true;
            minesPlaced++;
        }
    }
}

// Calculate the number of adjacent mines for each non-mine cell
function calculateMinesAround() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (!board[r][c].isMine) {
                let count = 0;
                // Check all 8 neighbors
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue; // Skip self

                        const nr = r + dr;
                        const nc = c + dc;

                        // Check bounds
                        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                            if (board[nr][nc].isMine) {
                                count++;
                            }
                        }
                    }
                }
                board[r][c].minesAround = count;
            }
        }
    }
}

// Handle a click on a cell
function handleClick(row, col) {
    if (isGameOver || board[row][col].isRevealed) {
        return;
    }

    const cell = board[row][col];

    if (cell.isMine) {
        isGameOver = true;
        messageH1.textContent = 'BOOM! Game Over.';
        cell.element.classList.add('mine-hit'); // Highlight the mine that was hit
        cell.element.textContent = '💣'; // Set bomb character for the hit one
        revealAllMines();
    } else {
        revealCell(row, col);
    }
}

// Recursively reveal cells, including empty areas (flood fill)
function revealCell(r, c) {
    // Base cases for recursion stop:
    // Out of bounds, already revealed, or is a mine
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE || board[r][c].isRevealed || board[r][c].isMine) {
        return;
    }

    const cell = board[r][c];
    cell.isRevealed = true;
    cell.element.classList.add('revealed');

    if (cell.minesAround > 0) {
        cell.element.textContent = cell.minesAround;
        cell.element.classList.add(`mines-around-${cell.minesAround}`); // Add class for styling numbers
    } else { // If it's an empty cell (0 mines around), recursively reveal neighbors
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                revealCell(r + dr, c + dc);
            }
        }
    }
}

// Reveal all mine locations when the game is over
function revealAllMines() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (board[r][c].isMine) {
                const cellElement = board[r][c].element;
                cellElement.classList.add('mine'); // Add styling class
                if (!cellElement.textContent) { // Only set bomb if not already set by mine-hit
                    cellElement.textContent = '💣'; // Set bomb character
                }
            }
        }
    }
}

// Start the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);
