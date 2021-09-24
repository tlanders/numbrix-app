export type Game = {
    mode: string,
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

export enum CellState {
    EMPTY = 'EMPTY',
    INVALID = 'INVALID',
    VALID = 'VALID',
    CONSTANT = 'CONSTANT'
}