import { TicTacToe } from "./tictactoe";

const ticTacToe = new TicTacToe(3);

export const onRestartGameClick = () => {
  ticTacToe.restart();
};

export const onBoardSizeChange = (event) => {
  const newBoardSize = event.target.value;

  document.getElementById("boardSizeLabel").innerText =
    `Board size: ${newBoardSize}`;
  ticTacToe.onChangeBoardSize(newBoardSize);
};

document.addEventListener("DOMContentLoaded", () => {
  ticTacToe.init();
});
