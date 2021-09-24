export const GAME_START = 'game/START';
export const GAME_CLEAR_BOARD = 'game/CLEAR_BOARD';
export const GAME_CHECK_BOARD = 'game/CHECK_BOARD';
export const GAME_CELL_CHANGE = 'game/CELL_CHANGE';

export const cellChange = (index: number, newCellVal: string) => ({
    type: GAME_CELL_CHANGE,
    payload: {
        index,
        value: newCellVal
    }
});

export const clearBoard = () => ({
    type: GAME_CLEAR_BOARD
});

export const startGame = () => ({
    type: GAME_START
});

export const checkBoard = () => ({
    type: GAME_CHECK_BOARD
});
