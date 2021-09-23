export type Game = {
    mode: string,
    width: number,
    height: number,
    cells: Cell[]
};

export type Cell = {
    value: string,
    cellstate: string
};

export type State = {
    game: Game
};
