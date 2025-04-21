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

    document.getElementById('score-container').classList.remove('hidden');
    document.getElementById('lives-container').classList.remove('hidden');

      // Place player and ghost on the board
      cells[playerIndex].classList.add('player');
      cells[ghostIndex].classList.add('ghost');

      // Listen for arrow key presses
      document.addEventListener('keydown',movePlayer);
      ghostTimer = setInterval(moveGhost, 500);

}
/**
 * Ends the game as win or loss
 * win - true for victory, false for game over
 */

function endGame(win = false) {
    gameActive = false;
    bgMusic.pause();
    clearInterval(ghostTimer);
    document.removeEventListener('keydown', movePlayer);

    if (win) {
        gameWinDisplay.classList.remove('hidden');    
    } else {
        gameOverDisplay.classList.remove('hidden');
    }

    restartBtn.classList.remove('hidden');
}
/**
 * Handles player movement based on arrow keys
 */
function movePlayer(e) {
    if (!gameActive) return;

    // Remove player class from current cell
    cells[playerIndex].classList.remove('player');
    let newIndex = playerIndex;

     // Determine new index based on arrow key pressed
  switch (e.key) {
    case 'ArrowLeft':
      if (playerIndex % width !== 0 && !cells[playerIndex - 1].classList.contains('wall')) {
        newIndex -= 1;
      }
      break;
    case 'ArrowRight':
      if (playerIndex % width < width - 1 && !cells[playerIndex + 1].classList.contains('wall')) {
        newIndex += 1;
      }
      break;
    case 'ArrowUp':
      if (playerIndex - width >= 0 && !cells[playerIndex - width].classList.contains('wall')) {
        newIndex -= width;
      }
      break;
    case 'ArrowDown':
      if (playerIndex + width < layout.length && !cells[playerIndex + width].classList.contains('wall')) {
        newIndex += width;
      }
      break;
  }

  playerIndex = newIndex;
  

    // If new cell has a dot, collect it
    if (cells[playerIndex].classList.contains('dot')) {
        cells[playerIndex].classList.remove('dot');
        score++;
        scoreDisplay.textContent = score;
    
        // Check victory: no more dots left
        if (cells.every(cell => !cell.classList.contains('dot'))) {
          endGame(true);
        }
      }
    
      // Check collision with ghost
      if (playerIndex === ghostIndex) {
        loseLife();
      }
    
      // Add player class to new cell
      cells[playerIndex].classList.add('player');
}
/**
 * Moves ghost randomly but not through walls
 */

function moveGhost() {
    const directions = [-1, +1, -width, +width];
    // Filter out invalid moves (walls or out of bounds)
    const validMoves = directions.filter(dir => {
      const target = ghostIndex + dir;
      return (
        target >= 0 &&
        target < layout.length &&
        !cells[target].classList.contains('wall')
      );
    });

     // Remove ghost class from current cell
  cells[ghostIndex].classList.remove('ghost');
  // Choose a random valid direction
  const direction = validMoves[Math.floor(Math.random() * validMoves.length)];
  ghostIndex += direction; // Update ghost position

  // Check collision with player
  if (ghostIndex === playerIndex) {
    loseLife();
  }
    // Add ghost class to new cell
    cells[ghostIndex].classList.add('ghost');
}

/**
 * Handles losing a life when player and ghost collide
 */

function loseLife() {
    lives--;
    livesDisplay.textContent = lives;

    if (lives <=0){
        // Game over if no lives remain
        endGame();
    } else {
        // Otherwise reset positions of player and ghost
        cells[playerIndex].classList.remove('player');
        cells[ghostIndex].classList.remove('ghost');
        playerIndex = 21;
        ghostIndex = 188;
        cells[playerIndex].classList.add('player');
        cells[ghostIndex].classList.add('ghost');
    }
}
// Touch controls - simulate arrow key presses
document.getElementById('btn-up').addEventListener('click', () => {
    movePlayer({ key: 'ArrowUp' });
  });
  
  document.getElementById('btn-down').addEventListener('click', () => {
    movePlayer({ key: 'ArrowDown' });
  });
  
  document.getElementById('btn-left').addEventListener('click', () => {
    movePlayer({ key: 'ArrowLeft' });
  });
  
  document.getElementById('btn-right').addEventListener('click', () => {
    movePlayer({ key: 'ArrowRight' });
  });

  const musicToggle = document.getElementById('music-toggle');
let musicPlaying = true;

musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🔇';
    } else {
        bgMusic.play().catch(err => {
            console.warn("Audio blocked:", err);
        });
        musicToggle.textContent = '🎵';
    }
    musicPlaying = !musicPlaying;
});


// ==================== Event Listeners ====================

// Start the game when the Start button is clicked
startBtn.addEventListener('click', ()=>{
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    document.getElementById('touch-controls').classList.add('visible');
    const musicToggle = document.getElementById('music-toggle');
    musicToggle.classList.remove('hidden');
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(err => {
        console.warn("Audio play was blocked by the browser:", err);
    });
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    startGame();
});
// Restart the game when the Restart button is clicked
restartBtn.addEventListener('click',() =>{
    gameOverDisplay.classList.add('hidden');
    gameWinDisplay.classList.add('hidden');
    document.getElementById('touch-controls').classList.add('visible');
    bgMusic.currentTime = 0;
    bgMusic.play().catch(err => {
        console.warn("Audio play was blocked on restart:", err);
    });
    gameOverDisplay.classList.add('hidden');
    gameWinDisplay.classList.add('hidden');
    startGame();
    
})

function showTouchControlsIfNeeded() {
    if (window.matchMedia('(max-width:768px').matches){
        touchControls.classList.remove('hidden');
     } else {
        touchControls.classList.add('hidden');
     }
}





