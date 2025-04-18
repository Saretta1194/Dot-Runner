// --- DOM Elements ---
// Selects HTML elements by their IDs

const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const gameOverDisplay = document.getElementById('game-over');
const gameWinDisplay = document.getElementById('game-win');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const bgMusic = document.getElementById('bg-music');

// --- Game Constants ---
// Number of columns in the grid
const width = 20; 

// Layout array 11x20: 1 = wall, 0 = dot

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,
  1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,
  1,0,1,0,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,
  1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1,
  1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
// --- Game State Variables ---
// Array to store references to each grid cell element
const cells = [];   
// Current index of the player in the cells array
let playerIndex = 21;
// Current index of the ghost
let ghostIndex = 188;
// Player's score
let score = 0;
// Remaining lives
let lives = 3;
// Flag indicating if the game is active
let gameActive = false; 
// Interval ID for ghost movement
let ghostTimer;

/**
 * Builds the game board (maze)
 * - Clears any existing board
 * - Iterates through layout array
 * - Creates a div.cell for each entry
 * - Adds .wall or .dot class based on value
 * - Stores each cell in cells[] array
 */

function createBoard(){
    game.innerHTML = '';
    cells.length = 0;
    
    for (let i = 0; i < layout.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
         // If layout[i] is 1, it's a wall; otherwise, it's a dot
         if (layout[i]=== 1) {
            cell.classList.add('wall');
         } else {
            cell.classList.add('dot');
         }

        game.appendChild(cell); 
        cells.push(cell);
    }
}

/**
 * Initializes and starts the game
 * - Builds board
 * - Resets player and ghost positions
 * - Resets score and lives
 * - Hides end screens and buttons
 * - Adds keyboard listener for player movement
 * - Starts ghost movement interval
 */

function startGame(){
    createBoard();
    playerIndex = 21;
    ghostIndex = 188;
    score = 0;
    lives = 3;
    gameActive = true;
   
    // Update UI displays

    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    gameOverDisplay.classList.add('hidden');
    gameWinDisplay.classList.add('hidden');
    restartBtn.classList.add('hidden');

      // Place player and ghost on the board
      cells[playerIndex].classList.add('player');
      cells[ghostIndex].classList.add('ghost');

      // Listen for arrow key presses
      document.addEventListener('keydown',movePlayer);
      ghostTimer = setInterval(moveGhost, 500);

}









