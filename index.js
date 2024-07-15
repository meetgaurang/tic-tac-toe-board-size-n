import { TicTacToe } from "./TicTacToe";

const ticTacToe = new TicTacToe(3);

const onRestartGameClick = () => {
  ticTacToe.restart();
};
const onBoardSizeChange = (event) => {
  document.getElementById(
    "boardSizeLabel"
  ).innerText = `Board size: ${event.target.value}`;
  ticTacToe.onChangeBoardSize(event.target.value);
};

document.addEventListener("DOMContentLoaded", () => {
  ticTacToe.init();
});
