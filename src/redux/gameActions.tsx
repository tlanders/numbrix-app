import {Action, NoArgActionCreator} from "../types";

export const GAME_NEW = 'game/NEW';
export const GAME_START = 'game/START';
export const GAME_CLEAR_BOARD = 'game/CLEAR_BOARD';
export const GAME_CHECK_BOARD = 'game/CHECK_BOARD';
export const GAME_CONFIGURE_BOARD = 'game/CONFIGURE_BOARD';
export const GAME_CELL_CHANGE = 'game/CELL_CHANGE';

export const cellChange: (index: number, newCellVal: string) => Action = (index: number, newCellVal: string) => ({
    type: GAME_CELL_CHANGE,
    payload: {
        index,
        value: newCellVal
    }
});

export const newGame: NoArgActionCreator = () => ({
    type: GAME_NEW
});

export const clearBoard: NoArgActionCreator = () => ({
    type: GAME_CLEAR_BOARD
});

export const startGame: NoArgActionCreator = () => ({
    type: GAME_START
});

export const checkBoard: NoArgActionCreator = () => ({
    type: GAME_CHECK_BOARD
});

export const configureBoard: NoArgActionCreator = () => ({
    type: GAME_CONFIGURE_BOARD
});
