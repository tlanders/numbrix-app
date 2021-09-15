export const BOARD_START_GAME = 'board/START_GAME';
export const BOARD_CLEAR_BOARD = 'board/CLEAR_BOARD';

export const clearBoard = () => ({
    type: BOARD_CLEAR_BOARD
});

export const startGame = () => ({
    type: BOARD_START_GAME
});

export const SETUP_MODE = 'SETUP_MODE';
export const PLAY_MODE = 'PLAY_MODE';

export const CELL_STATE = {
    EMPTY: 0,
    INVALID: -1,
    VALID: 1,
    CONSTANT: 2
};