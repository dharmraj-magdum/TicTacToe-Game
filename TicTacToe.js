const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.querySelector("#restart");

cells.forEach((block) => block.addEventListener("click", clicked));
restartBtn.addEventListener("click", restartGame);

const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

var board;
var currentPlayer;
var running;
function restartGame() {
	//just reset everything hardcoded.
	currentPlayer = Math.random() > 0.5 ? "X" : "O";
	board = ["", "", "", "", "", "", "", "", ""];
	statusText.innerHTML = `<span>${currentPlayer}</span>'s turn`;
	cells.forEach((block) => {
		block.textContent = "";
		block.classList.remove("X");
		block.classList.remove("O");
		block.classList.remove("matched");
	});
	running = true;
	restartBtn.classList.add("hide");
}
//initial start
restartGame();

function clicked() {
	if (!running) {
		return;
	}
	const cellindex = this.getAttribute("cellIndex");
	if (board[cellindex] != "") {
		return; //block already filled.
	}
	updateCell(this, cellindex); //send block and its index to update.

	checkWinner(); //after placing marker check winner.
}
function updateCell(cell, index) {
	//change board/stored value.(this for logica)
	board[index] = currentPlayer;
	// place marker to that block.(this is for display)
	cell.textContent = currentPlayer;
	//add extra class just for good look
	cell.classList.add(`${currentPlayer}`);
}
function changePlayer() {
	//just change marker as X to 0
	currentPlayer = currentPlayer == "X" ? "O" : "X";
	statusText.innerHTML = `<span>${currentPlayer}</span>'s Turn`;
}

function checkWinner() {
	let roundWon = false;

	for (let i = 0; i < winConditions.length; i++) {
		//get value of array in store (diiff) win condn.
		const stored = winConditions[i]; //travel to diff win condn.
		var first = stored[0];
		var second = stored[1];
		var third = stored[2];
		//get value of cell which posi soln.
		const block1 = board[first];
		const block2 = board[second];
		const block3 = board[third];
		//we check board store here in js for this purpose only
		//ex- wincond[2] [6, 7, 8], So board[stored[0]]=6th board value we stored.
		//similarly assing the marker values to temp 3 block.

		if (block1 == "" || block2 == "" || block3 == "") {
			continue; //one of the cell is empty  go to next
		}
		if (block1 == block2 && block2 == block3) {
			//all of same marker then win.
			roundWon = true;
			//extra to show what line matched
			cells[first].classList.add("matched");
			cells[second].classList.add("matched");
			cells[third].classList.add("matched");
			break;
		}
		//this loop may run  mini-array in wincond times like 2d array.
	}

	if (roundWon) {
		statusText.innerHTML = `<span>${currentPlayer}</span> WIN!`;
		restartBtn.classList.remove("hide");
		running = false;
	} else if (!board.includes("")) {
		//all cell are filled to make draw
		statusText.innerHTML = `DRAW!`;
		restartBtn.classList.remove("hide");
		running = false;
	} else {
		changePlayer();
	}
}
