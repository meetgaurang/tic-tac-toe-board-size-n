export class TicTacToe {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.isCrossTurnNow = undefined;
    this.boardInMemory = undefined;
    this.winnderDeclarationElement = undefined;
    this.winner = undefined;
  }

  /**
   * Initilises the TicTacToe board in memory as well as renders in the DOM.
   * This must be called after DOM content is ready, in other words, once 'DOMContentLoaded' event is fired.
   */
  init() {
    this.isCrossTurnNow = true;
    this.boardInMemory = [];
    this.boardElement = document.getElementById("board");
    this.winnderDeclarationElement = document.getElementById("declaration");
    this.#createBoardInMemory();
    this.#renderBoard();
  }

  restart() {
    // Clear previously declared winner, if any
    this.winner = undefined;
    this.winnderDeclarationElement.innerText = "";
    // Clear previously rendered board
    this.boardElement.innerHTML = "";

    // Initialise
    this.init();
  }

  onChangeBoardSize(newSize) {
    this.boardSize = newSize;
    this.restart();
  }

  #createBoardInMemory() {
    for (let i = 0; i < this.boardSize; i++) {
      const emptyRow = new Array(this.boardSize).fill("");
      this.boardInMemory.push(emptyRow);
    }
  }

  #renderBoard() {
    // Set template column dynamically
    this.boardElement.setAttribute(
      "style",
      `grid-template-columns: repeat(${this.boardSize}, 1fr)`,
    );

    // Start adding cells in the board
    for (let x = 0; x < this.boardSize; x++) {
      for (let y = 0; y < this.boardSize; y++) {
        const divElement = document.createElement("div");
        divElement.className = "cell";
        // Each element will be identified by x and y cooardinates like '00', '01', '02'  etc.
        divElement.id = x + "" + y;
        divElement.onclick = this.#onCellClick;
        this.boardElement.append(divElement);
      }
    }
  }

  #onCellClick = (event) => {
    // Don't do anything if the game has finished
    if (this.winner) {
      return;
    }

    let cellCoordinates = event.target.getAttribute("id");
    const xCoordinate = Number(cellCoordinates.charAt(0));
    const yCoordinate = Number(cellCoordinates.charAt(1));
    let value = this.boardInMemory[xCoordinate][yCoordinate];

    if (!value) {
      document.getElementById(cellCoordinates).innerText = this.isCrossTurnNow
        ? "X"
        : "O";
      this.boardInMemory[xCoordinate][yCoordinate] = this.isCrossTurnNow
        ? "X"
        : "O";
      this.isCrossTurnNow = !this.isCrossTurnNow;
      this.winner = this.#analyseBoardAndDecideWinner(this.boardInMemory);
      if (this.winner) {
        this.winnderDeclarationElement.innerText = this.winner + " won!";
      }
    }
  };

  #analyseBoardAndDecideWinner() {
    for (let i = 0; i < this.boardSize; i++) {
      // Check for rows
      let rowValue = this.boardInMemory[i][0];
      let rowHasSameValues = true;

      // If row has an empty cell, go to the next row
      if (!rowValue) {
        rowHasSameValues = false;
      } else {
        for (let j = 0; j < this.boardSize; j++) {
          if (rowValue !== this.boardInMemory[i][j]) {
            rowHasSameValues = false;
            break;
          }
        }
      }
      if (rowHasSameValues) {
        return rowValue;
      }

      // Check for columns
      let columnValue = this.boardInMemory[0][i];
      let columnHasSameValues = true;

      // If column has an empty cell, go to the next column
      if (!columnValue) {
        columnHasSameValues = false;
      } else {
        for (let j = 0; j < this.boardSize; j++) {
          if (columnValue !== this.boardInMemory[j][i]) {
            columnHasSameValues = false;
            break;
          }
        }
      }

      if (columnHasSameValues) {
        return columnValue;
      }
    }

    // Check the first diagonal
    const diagonal1Val = this.boardInMemory[0][0];
    const diagonal2Val = this.boardInMemory[0][this.boardSize - 1];
    let diagonal1HasSameValues = true;
    let diagonal2HasSameValues = true;

    for (let i = 0; i < this.boardSize; i++) {
      if (diagonal1Val !== this.boardInMemory[i][i]) {
        diagonal1HasSameValues = false;
      }

      if (diagonal2Val !== this.boardInMemory[i][this.boardSize - i - 1]) {
        diagonal2HasSameValues = false;
      }
    }

    if (diagonal1HasSameValues) {
      return diagonal1Val;
    }
    if (diagonal2HasSameValues) {
      return diagonal2Val;
    }

    return false;
  }
}
