const renderBoard = (boardSize, parentElement, onCellClick) => {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const divElement = document.createElement("div");
      divElement.className = "cell";
      // Each element will be identified by x and y cooardinates like '00', '01', '02'  etc.
      divElement.id = i + "" + j;
      divElement.onclick = onCellClick;
      parentElement.append(divElement);
      // TODO: Set template column dynamically
    }
  }
};
