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










