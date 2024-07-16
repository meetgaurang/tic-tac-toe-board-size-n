export class TicTacToe {
  constructor(boardSize) {
    this.boardSize = boardSize;
  }

  /**
   * Initilises the TicTacToe board in memory as well as renders in the DOM.
   * This must be called after DOM content is ready, in other words, once 'DOMContentLoaded' event is fired.
   */
  init() {
    this.isCrossTurnNow = true;
    this.boardInMemory = [];
    this.boardElement = document.getElementById("board");
    this.#createBoardInMemory();
    this.#renderBoard();
  }

  restart() {
    document.getElementById("declaration").innerText = "";
    this.init();
  }

  onChangeBoardSize(newSize) {
    this.boardSize = newSize;
    document.getElementById("declaration").innerText = "";
    this.init();
  }

  #createBoardInMemory() {
    this.boardInMemory = [];
    for (let i = 0; i < this.boardSize; i++) {
      this.boardInMemory.push(new Array(this.boardSize).fill(""));
    }
  }

  #renderBoard() {
    this.boardElement.innerHTML = "";
    // TODO: Set template column dynamically
    this.boardElement.setAttribute(
      "style",
      `grid-template-columns: repeat(${this.boardSize}, 1fr)`
    );

    // Start adding cells in the board
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        const divElement = document.createElement("div");
        divElement.className = "cell";
        // Each element will be identified by x and y cooardinates like '00', '01', '02'  etc.
        divElement.id = i + "" + j;
        divElement.onclick = this.#onCellClick;
        this.boardElement.append(divElement);
      }
    }
  }

  #onCellClick = (event) => {
    let cellId = event.target.getAttribute("id");
    const index1 = Number(cellId.charAt(0));
    const index2 = Number(cellId.charAt(1));
    let value = this.boardInMemory[index1][index2];

    if (!value) {
      document.getElementById(cellId).innerText = this.isCrossTurnNow
        ? "X"
        : "O";
      this.boardInMemory[index1][index2] = this.isCrossTurnNow ? "X" : "O";
      this.isCrossTurnNow = !this.isCrossTurnNow;
      const mark = this.#analyseBoardAndDecideWinner(this.boardInMemory);
      if (!!mark) {
        document.getElementById("declaration").innerText = mark + " won!";
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
