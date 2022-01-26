'use strict';
const PACMAN = ' 🧑🏻 ';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}



function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        var currGhost = getGhostByLoc(nextLocation);
        handleGhost(currGhost);

    };
    if (nextCellContent === FOOD) collectFood();
    if (nextCellContent === CHERRY) {
        updateScore(10);
        gCherryOnBoard = false;
    }
    if (nextCellContent === SUPER) {
        if (gPacman.isSuper) return;
        makeSuper();
    };
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}


function makeSuper() {
    gPacman.isSuper = true;
    setTimeout(resetGhosts, 5000);
}

function collectFood() {
    updateScore(1);
    gFoodCount--;
    if (gFoodCount === 0) victory();

}

function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }

    return nextLocation;
}

function getGhostByLoc(loc) {
    for (var i = 0; i < gGhosts.length; i++) {
        if ((gGhosts[i].location.i === loc.i) && (gGhosts[i].location.j === loc.j)) {
            return gGhosts[i];
        }
    }
}