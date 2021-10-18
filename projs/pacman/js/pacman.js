'use strict'
const PACMAN = '😷';
var gRotateDeg = 0;

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        currCellContent: EMPTY
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        gFoodCollected++;
        console.log(gFoodCollected);
        console.log(gFoodNum);
        updateScore(1);
    }

    if (nextCell === CHERRY) {
        gFoodCollected++;
        updateScore(10);
    }

    if (nextCell === GHOST) {
        //do super mode
        if (!gPacman.isSuper) {
            gameOver();
            renderCell(gPacman.location, EMPTY)
        } else {
            //eat ghost
            var deadGhost = 0;
            for (var i = 0; i < gGhosts.length; i++) {
                if ((gGhosts[i].location.i === nextLocation.i) && (gGhosts[i].location.j === nextLocation.j)) {
                    deadGhost = i;
                }
            }
            deadGhost = gGhosts.splice(deadGhost, 1);
            gDeadGhost.push(deadGhost[0]);
            gBoard[nextLocation.i][nextLocation.j] = EMPTY;
            renderCell(nextLocation, EMPTY);

        }
        return;
    }

    if (nextCell === POWER_FOOD) {
        if (!gPacman.isSuper) {
            gPacman.isSuper = true;
            updateGhosts2SuperMode();
            setTimeout(endSuperMode, 5000);
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);
    // new Audio('move.wav').play();

    if (gFoodCollected === gFoodNum) {
        gameOver();
    }


}

function endSuperMode() {
    gPacman.isSuper = false;
    var temp = gGhosts;
    gGhosts = gDeadGhost;
    gDeadGhost = temp;
    for (var i = 0; i < gDeadGhost.length; i++) {
        gGhosts.push(gDeadGhost[i]);
    }
    for (var i = 0; i < gGhosts.length; i++) {
        // console.log(gGhosts[i][0]);
        // console.log(gGhosts[i][0].location);
        gBoard[gGhosts[i].location.i][gGhosts[i].location.j] = GHOST;
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
    //return ghosts and dead ones
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            // var elPacman = document.querySelector("#pacman");
            // elPacman.style.transform = "rotate(270deg)";
            gRotateDeg = 270;
            nextLocation.i--;

            //rotate picture

            break;
        case 'ArrowDown':
            gRotateDeg = 90;
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gRotateDeg = 180;
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gRotateDeg = 0;
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}