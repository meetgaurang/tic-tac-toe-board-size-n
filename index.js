import { onBoardSizeChange, onRestartGameClick } from "./game";

/**
 * Since index.js is imported in index.html as 'type=module',
 * functions needs to be attached to 'window' object to make it available in index.html
 */
window.onBoardSizeChange = onBoardSizeChange;
window.onRestartGameClick = onRestartGameClick;
