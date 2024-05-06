const readline = require("readline"); //readline module provides an interface for reading data from readable stream (like process.stdin) one line at a time
const rl = readline.createInterface({ //createInterface method creates a readline.Interface instance
  input: process.stdin,// process.stdin is a readable stream
  output: process.stdout, // process.stdout is a writable stream
});

let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; //initialize the board with empty cells

function printBoard() { //function to print the board
  console.log(board[0] + "|" + board[1] + "|" + board[2]); //print the first row of the board
  console.log(board[3] + "|" + board[4] + "|" + board[5]);//print the second row of the board
  console.log(board[6] + "|" + board[7] + "|" + board[8]);//print the third row of the board
}

function askPosition(player, callback) { //function to ask the player to enter a position
  printBoard();// print the board
  rl.question(`${player}'s turn. Enter a position from 1-9: `, (input) => { //ask the player to enter a position
    let position = parseInt(input) - 1; //parse the input to an integer and subtract 1 to get the index of the board array
    if (position < 0 || position > 8 || board[position] !== "-") { //check if the position is valid
      console.log("Invalid position. Try again."); //print an error message
      askPosition(player, callback); // ask the player to enter a position again
    } else {
      board[position] = player; //update the board with the player's move
      callback(); //    call the callback function
    }
  });
}

function checkWinner() { // function to check if there is a winner or a tie
  if (
    (board[0] === board[1] && board[1] === board[2] && board[0] !== "-") || //check the rows, columns, and diagonals for a win
    (board[3] === board[4] && board[4] === board[5] && board[3] !== "-") ||
    (board[6] === board[7] && board[7] === board[8] && board[6] !== "-") ||
    (board[0] === board[3] && board[3] === board[6] && board[0] !== "-") ||
    (board[1] === board[4] && board[4] === board[7] && board[1] !== "-") ||
    (board[2] === board[5] && board[5] === board[8] && board[2] !== "-") ||
    (board[0] === board[4] && board[4] === board[8] && board[0] !== "-") ||
    (board[2] === board[4] && board[4] === board[6] && board[2] !== "-")
  ) {
    return "win"; //return win if there is a winner
  } else if (!board.includes("-")) { // check if the board is full
    return "tie";
  } else {
    return "continue";
  }
}

function playGame() { // function to start the game
  let currentPlayer = "X";
  function nextTurn() { // function to switch players and check the game status
    let result = checkWinner(); //check if there is a winner or a tie
    if (result === "win") { //print the result and close the readline interface
      console.log(`${currentPlayer} wins`);
      return rl.close();
    } else if (result === "tie") {
      console.log("It is a tie.");
      return rl.close();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X"; //switch players
      askPosition(currentPlayer, nextTurn);
    }
  }
  askPosition(currentPlayer, nextTurn); //start the game by asking the first player to enter a position
}

playGame(); // start the game
