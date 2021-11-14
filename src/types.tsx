export type Game = {
    mode: GameMode,
    width: number,
    height: number,
    cells: Cell[]
};

export type Cell = {
    value: string,
    cellstate: CellState
};

export type State = {
    game: Game
};

export enum GameMode {
    SETUP_MODE = 'SETUP_MODE',
    PLAY_MODE = 'PLAY_MODE',
    GAME_OVER_MODE = 'GAME_OVER_MODE',
};

export enum CellState {
    EMPTY = 'EMPTY',
    INVALID = 'INVALID',
    VALID = 'VALID',
    CONSTANT = 'CONSTANT'
}

export type Action = {
    type: string,
    payload?: any
};

export type NoArgActionCreator = () => Action;