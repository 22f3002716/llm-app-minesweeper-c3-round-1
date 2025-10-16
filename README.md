# Minesweeper Game

A classic Minesweeper game implemented as a single-page web application. The objective is to clear an 8x8 grid containing 10 hidden mines without detonating any of them.

## Features

*   **8x8 Grid:** A standard grid size for a quick game.
*   **10 Mines:** Randomly placed mines across the board.
*   **Mine Counter:** Reveals the number of adjacent mines for each cleared cell.
*   **Auto-Reveal Empty Cells:** Clicking an empty cell automatically clears all connected empty cells and their numbered borders.
*   **Game Over State:**
    *   Clicking on a mine triggers the 'BOOM! Game Over.' message in an `<h1>` tag.
    *   Upon game over, all mine locations are revealed on the board.
*   **Basic Styling:** Clean and functional design.

## How to Run

1.  **Save the files:** Save `index.html`, `style.css`, and `script.js` into the same directory on your local machine.
2.  **Open `index.html`:** Simply open the `index.html` file in any modern web browser (e.g., Chrome, Firefox, Safari, Edge).
3.  **Play:**
    *   Click on a cell to reveal its content.
    *   If you click a mine, the game ends, 'BOOM! Game Over.' is displayed, and all mines are shown.
    *   If you click an empty cell (with 0 adjacent mines), it will automatically clear adjacent empty cells and their numbered neighbors.
    *   If you click a numbered cell, it will reveal the number of mines immediately surrounding it.

## Technologies Used

*   HTML5 (for structure)
*   CSS3 (for styling)
*   JavaScript (for game logic)
