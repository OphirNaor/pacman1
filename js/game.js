'use strict';
const WALL = '⛔';
const FOOD = '⚬';
const EMPTY = ' ';
const SUPER = '🥩';
const CHERRY = '🍒';


var gBoard;
var gGame = {
    score: 0,
    isOn: false
};
// var gCherryInterval;
var gFoodCount = 60;
var gIsSuper = true;
var gCherryOnBoard = false;

function init() {
    gFoodCount = 0;
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    updateScore(0);
    setInterval(addCherry, 1000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                cell = WALL;
            }
            else gFoodCount++;
            board[i][j] = cell;
        }

    }
    gFoodCount--;

    board[1][1] = SUPER;
    board[8][1] = SUPER;
    board[1][8] = SUPER;
    board[8][8] = SUPER;
    gFoodCount -= 4;



    return board;
}


function addCherry() {
    if (!gCherryOnBoard) {
        var pos = getEmptypos();
        if (!pos) return;
        gBoard[pos.i][pos.j] = CHERRY;
        renderCell(pos, CHERRY);
        gCherryOnBoard = true;

    }

}


// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    if (gFoodCount === 0) victory();
}

// 
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var elModal = document.querySelector('.modal');
    elModal.classList.remove('hide');

}


function restart() {
    init();
    updateScore(-gGame.score);
    var elModal = document.querySelector('.modal');
    elModal.classList.add('hide');

}


function victory() {
    init();
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var elModal = document.querySelector('.modal');
    elModal.style.backgroundColor = ' #333';
    var elModalH2 = document.querySelector('.modal h3')
    elModalH2.innerText = 'Well done, You Win! 👏'
    elModal.classList.remove('hide');

}





