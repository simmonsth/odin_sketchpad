const DEFAULT_CELLS = 256;
const RGB = "0123456789abcdef";
let gridSize = DEFAULT_CELLS;
let setClear = false;
let randomColors = false;
let darkenColors = false;

function randomizeRgb() {
    let myRgb = "#";
    for (i = 0; i < 6; i++) {
        myRgb += RGB[Math.floor(Math.random() * 16)];
    }
    return myRgb;
}

function hoverListener() {
    let allCells = document.querySelectorAll('.cell');
    if (randomColors) {
        randomColors = false;
        return allCells.forEach(cell => cell.addEventListener('mouseover', function () {
            cell.style.backgroundColor = `${randomizeRgb()}`;
        }));
    } else if (darkenColors) {
        darkenColors = false;
        allCells.forEach(cell => cell.style.backgroundColor = "rgba(0, 0, 0, 0.1)");
        return allCells.forEach(cell => cell.addEventListener('mouseover', function () {
            ptn = /0.[0-9]/i;
            console.log(cell.style.backgroundColor);
            opacity = cell.style.backgroundColor.match(ptn);
            cell.style.backgroundColor = `rgba(0, 0, 0, ${Number(opacity[0])+0.1})`;   
        }));
    } else {
        return allCells.forEach(cell => cell.addEventListener('mouseover', function () {
            cell.style.backgroundColor = "black";
        }));
    }
}

function setGrid(size) {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.remove());
    if (setClear) {
        size = prompt('Please chose a grid size', '');
        gridSize = size * size;
        let grid = document.getElementById('user-grid');
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        setClear = false;
    }
    generateGrid(gridSize);
    return hoverListener();
}

function generateGrid(size) {
    let divCell;
    let container = document.getElementById('user-grid');

    for (i = 0; i < size; i++) {
        divCell = document.createElement('div');
        divCell.className = "cell";
        container.appendChild(divCell);
    }     
}

clearButton = document.querySelector('#set-clear');
clearButton.addEventListener('click', function() {
    setClear = true;
    setGrid(gridSize);
});

rndColorsButton = document.querySelector('#random-colors');
rndColorsButton = rndColorsButton.addEventListener('click', function () {
    randomColors = true;
    setGrid(gridSize);
});

darkenButton = document.querySelector('#darken');
darkenButton = darkenButton.addEventListener('click', function () {
    darkenColors = true;
    setGrid(gridSize);
});

generateGrid(DEFAULT_CELLS);
hoverListener();