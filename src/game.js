import { TicTacToe } from "./TicTacToe";

const ticTacToe = new TicTacToe(3);

export const onRestartGameClick = () => {
  ticTacToe.restart();
};
export const onBoardSizeChange = (event) => {
  document.getElementById("boardSizeLabel").innerText =
    `Board size: ${event.target.value}`;
  ticTacToe.onChangeBoardSize(event.target.value);
};

document.addEventListener("DOMContentLoaded", () => {
  ticTacToe.init();
});