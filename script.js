const gameBoard = document.getElementById("game-board");
const replayButton = document.getElementById("replay");
let winningPositions = [];
let rowPositions = [];
let realPositions = [];
let selectedRow = 0;
let selectedColumn = 0;
let gameOver = false;

const rows = 10;
const cols = 1;

const colorsArray = Array.from({ length: rows }, () => Array(cols).fill(0));

const colors = [
    "#FF0000", // Red
    "#0000FF", // Blue
    "#00FF00", // Green
    "#FFFF00", // Yellow
    "#FFA500", // Orange
    "#800080", // Purple
    "#FFC0CB", // Pink
    "#A52A2A", // Brown
    "#008000", // Dark Green
    "#808080"  // Gray
  ];

let random = 0;
let position = 0;
let done = false;
let n = 10;
let randomRow = 0;
let randomDirection = 0;
let randomCell = 0;
let randomSide = 0;
let elementFound = false;
let sideX = 0;
let sideY = 0;
let sideMin = 0;
let sideMax = 0;
let stopTimer = false;

let seconds = 0;
let minutes = 0;
let hours = 0;

const timerDisplay = document.getElementById("timer");

for (i = 0; i < 10; i++) {
    while (done === false) {
        random = Math.floor(Math.random() * 10);
        console.log(random);
        // If something exists in this column, skip
        if (rowPositions.includes(random)) {
            console.log('Includes random');
            console.log(rowPositions);
        // If previous row had a close queen (+1/-1 position)
        } else if (i !== 0 && Math.abs(winningPositions[i - 1] - random) <= 1) {
           // Start over if you came to the 9th position and it can't be placed due to proximity
           if (Math.abs(winningPositions[i - 1] - random) <= 1 && i >= 8) {
            console.log('9th pos in proximity');
            rowPositions = [];
            i = 0;
           }
          // otherwise, add position to rowPositions
        } else {
            rowPositions.push(random);
            winningPositions[i] = random;
            done = true;
            console.log(rowPositions);
        }
    }
    done = false;
}

console.log(winningPositions);


for (i = 0; i < 10; i++) {
    console.log(i * 10 + winningPositions[i]);
    colorsArray[i][0] = i * 10 + winningPositions[i];
}
console.log(colorsArray);

while (n < 10000) {
    randomRow = Math.floor(Math.random() * 10);
    randomDirection = Math.round(Math.random());
    randomCell = Math.floor(Math.random() * colorsArray[randomRow].length);
    randomSide = Math.round(Math.random()) === 0 ? -1 : 1;

    sideX = colorsArray[randomRow][colorsArray[randomRow].length - randomCell - 1] - randomSide;
    sideY = colorsArray[randomRow][colorsArray[randomRow].length - randomCell - 1] - randomSide * 10;

    console.log(sideX);
    console.log(sideY);
    console.log(colorsArray);

    if (colorsArray[randomRow][colorsArray[randomRow].length - randomCell - 1] % 10 != 0) {
        sideMax = (Math.ceil(colorsArray[randomRow][colorsArray[randomRow].length - randomCell - 1] / 10)) * 10;
        sideMin = (Math.floor(colorsArray[randomRow][colorsArray[randomRow].length - randomCell - 1] / 10)) * 10;
    } else {
        sideMax = 10 + (Math.ceil(colorsArray[randomRow][colorsArray[randomRow].length - randomCell - 1] / 10)) * 10;
        sideMin = (Math.floor(colorsArray[randomRow][colorsArray[randomRow].length - randomCell - 1] / 10)) * 10;
    }
    console.log(sideMin, sideMax);

    

    if (randomDirection === 0) {
        if (!containsElement(sideX) && sideX >= 0 && sideX < 100 && sideX < sideMax && sideX >= sideMin) {
            colorsArray[randomRow][colorsArray[randomRow].length] = sideX;
            console.log(sideX);
            n++;
        }
    } else {
        if (!containsElement(sideY) && sideY >= 0 && sideY < 100) {
            colorsArray[randomRow][colorsArray[randomRow].length] = sideY;
            console.log(sideY);
            n++;
        }
    }
    n++;
    elementFound = false;
}

let numbersArray = [];
for (i = 0; i < 100; i++) {
    numbersArray[i] = i;
}

for (i = 0; i < 10; i++) {
    for (j = 0; j < colorsArray[i].length; j++) {
        if (numbersArray.includes(colorsArray[i][j])) {
            const index = numbersArray.indexOf(colorsArray[i][j]); // Find the index of the first occurrence of
            if (index > -1) {
                numbersArray.splice(index, 1); // Remove 1 element at the specified index
            }   
        }
    }
}
console.log(numbersArray);

for (k = 0; k < numbersArray.length; k++) {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < colorsArray[i].length; j++) {
            if (colorsArray[i].includes(numbersArray[k] + 1)) {
                colorsArray[i][colorsArray[i].length] = numbersArray[k];
                console.log(numbersArray[k]);
                break;
            } else if (numbersArray[k] === 99) {
                if (colorsArray[i].includes(numbersArray[k] - 1)) {
                    colorsArray[i][colorsArray[i].length] = numbersArray[k];
                    console.log(numbersArray[k]);
                    break;
                }
            }
        }
    }
}

if (numbersArray.length > 0) {
    location.reload();
}

// Building the table
for (i = 0; i < 10; i++) {
    let row = document.createElement("tr");
    gameBoard.appendChild(row);
    for (j = 0; j < 10; j++) {
        let cell = document.createElement("td");
        cell.id = `${i}${j}`;
        row.appendChild(cell);
    }
}

// Actually coloring the cells
for (i = 0; i < 10; i++) {
    for (j = 0; j < colorsArray[i].length; j++) {
        if (colorsArray[i][j] < 10) {
            elementToColor = document.getElementById(`0${colorsArray[i][j]}`);
            console.log(`0${colorsArray[i][j]}`);
        } else {
            elementToColor = document.getElementById(`${colorsArray[i][j]}`);
            console.log(`${colorsArray[i][j]}`);
        }
        
        elementToColor.style.backgroundColor = colors[i];
    }
}

console.log(colorsArray);


///////////////////////////////////////////////////////////

function containsElement(element) {
    for (i = 0; i < 10; i++) {
        if (colorsArray[i].includes(element)) {
            elementFound = true;
        }
    }
    return elementFound;
}

document.addEventListener("click", clickHandler);

function clickHandler(event) {
    if (!gameOver) {
        console.log(event.target); // Outputs: The button element that was clicked
        let parentEl = "";
        if (event.target.tagName === 'IMG') {
            parentEl = event.target.parentElement;
            console.log(parentEl);
        } else if (event.target.tagName === 'TD') {
            parentEl = event.target;
        }

        const clickedElementId = parentEl.id;
        clickedRow = Math.floor(clickedElementId / 10);
        clickedColumn = clickedElementId % 10;

        console.log(clickedRow, clickedColumn);
        

        if (parentEl.tagName === 'TD') {
            console.log(realPositions, realPositions[clickedRow]);
            if (event.target.querySelector("img") == null && event.target.tagName !== 'IMG') {
                if (realPositions.includes(clickedColumn) || realPositions[clickedRow] >= 0 || tooClose(clickedElementId) || sameColor(clickedElementId)) {
                    alert("Can't place the queen here!")
                } else {
                    realPositions[clickedRow] = clickedColumn;
                    event.target.innerHTML = "<img src='queen.png' width='20' />";
                    console.log(clickedRow, clickedColumn);
                    console.log(realPositions);
                }
                
            } else {
                console.log(parentEl);
                realPositions[clickedRow] = -1;
                parentEl.innerHTML = "";
                console.log(realPositions);
            }
        }   

        if (realPositions.length === 10 && !realPositions.includes(-1) && !realPositions.includes(undefined)) {
            alert('You WIN!');
            stopTimer = true;
            gameOver = true;
        }
    }
}

replayButton.addEventListener("click", replayGame);

function replayGame(event) {
    location.reload();
}

function tooClose(cell) {
    clickedRow = Math.floor(cell / 10);
    clickedColumn = cell % 10;

    if (realPositions[clickedRow - 1] === clickedColumn - 1 || realPositions[clickedRow - 1] === clickedColumn + 1 || realPositions[clickedRow + 1] === clickedColumn - 1 || realPositions[clickedRow + 1] === clickedColumn + 1) {
        return true;
    }
}

function sameColor(cell) {

    clickedRow = Math.floor(cell / 10);
    clickedColumn = cell % 10;

    let currentColor = -1;
    for (i = 0; i < 10; i++) {
        if (colorsArray[i].includes(+cell)) {
            currentColor = i;
            console.log(`${i}${realPositions[i]}`, +cell, colorsArray, realPositions);

            for (j = 0; j < realPositions.length; j++) {
                if (colorsArray[currentColor].includes(+`${j}${realPositions[j]}`)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function updateTimer() {
    if (!stopTimer) {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
    timerDisplay.textContent = formattedTime;
    }
}
  
  function pad(number) {
    return (number < 10 ? "0" : "") + number;
  }
  

setInterval(updateTimer, 1000); // Update every second

