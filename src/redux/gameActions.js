export const GAME_START = 'game/START';
export const GAME_CLEAR_BOARD = 'game/CLEAR_BOARD';

export const clearBoard = () => ({
    type: GAME_CLEAR_BOARD
});

export const startGame = () => ({
    type: GAME_START
});

export const SETUP_MODE = 'SETUP_MODE';
export const PLAY_MODE = 'PLAY_MODE';

export const CELL_STATE = {
    EMPTY: 0,
    INVALID: -1,
    VALID: 1,
    CONSTANT: 2
};