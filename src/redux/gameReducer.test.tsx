import React from 'react';
import {anyCellsAreEmptyOrInvalid, anyCellsHaveValue, gameReducer, getCellsToCheck} from "./gameReducer";
import {Cell, CellState, GameMode} from "../types";
import {clearBoard, newGame} from "./gameActions";

describe("get cells to check tests", () => {
    const width = 4;
    const height = 4;

    test("top left corner to fail", () => {
        const cellsToCheck = getCellsToCheck(0, width, height);
        expect(cellsToCheck.length).toBe(-1);
        expect(cellsToCheck).toContain(-1);
        expect(cellsToCheck).toContain(width);
    });

    test("top left corner", () => {
        const cellsToCheck = getCellsToCheck(0, width, height);
        expect(cellsToCheck.length).toBe(2);
        expect(cellsToCheck).toContain(1);
        expect(cellsToCheck).toContain(width);
    });

    test("top right corner", () => {
        const cellsToCheck = getCellsToCheck(width - 1, width, height);
        expect(cellsToCheck.length).toBe(2);
        expect(cellsToCheck).toContain(width - 2);
        expect(cellsToCheck).toContain(width + height - 1);
    });

    test("bottom left corner", () => {
        const cellsToCheck = getCellsToCheck(width * (height - 1), width, height);
        expect(cellsToCheck.length).toBe(2);
        expect(cellsToCheck).toContain(width * (height - 2));
        expect(cellsToCheck).toContain(width * (height - 1) + 1);
    });

    test("bottom right corner", () => {
        const cellsToCheck = getCellsToCheck((width * height) - 1, width, height);
        expect(cellsToCheck.length).toBe(2);
        expect(cellsToCheck).toContain((width * height) - 2);
        expect(cellsToCheck).toContain(width * (height - 1) - 1);
    });

    test("central location", () => {
        const centralIndex = (width * height) / 2 - 2;
        const cellsToCheck = getCellsToCheck(centralIndex, width, height);
        expect(cellsToCheck.length).toBe(4);
        expect(cellsToCheck).toContain(centralIndex - 1);
        expect(cellsToCheck).toContain(centralIndex + 1);
        expect(cellsToCheck).toContain(centralIndex - width);
        expect(cellsToCheck).toContain(centralIndex + width);
    });

    test("top edge", () => {
        const index = 1;
        const cellsToCheck = getCellsToCheck(index, width, height);
        expect(cellsToCheck.length).toBe(3);
        expect(cellsToCheck).toContain(index - 1);
        expect(cellsToCheck).toContain(index + 1);
        expect(cellsToCheck).toContain(index + width);
    });
});

const EMPTY_BOARD: Cell[] = [
    {cellstate: CellState.EMPTY, value: ""}
] ;

const createCell = (value: string, cellstate: CellState) => ({value, cellstate});

function createGameState(mode: GameMode, cells:Cell[], width: number, height: number) {
    return {mode, cells, width, height};
}

describe("reducer - clear board tests", () => {
    test("basic clear board test", ()  => {
        const width = 4;
        const height = 4;
        const newState = gameReducer(createGameState(GameMode.SETUP_MODE, EMPTY_BOARD, width, height), clearBoard());
        console.log("new state: " , newState);
        expect(newState.cells.length).toBe(width * height);
        for(let i = 0; i < newState.cells.length; i++) {
            expect(newState.cells[i].value).toBe("");
            expect(newState.cells[i].cellstate).toBe(CellState.EMPTY);
        }
    })
});

describe("reducer - new game tests", () => {
    test("basic new game test", ()  => {
        const width = 4;
        const height = 4;
        let cells:Cell[] = EMPTY_BOARD;
        cells[1] = {cellstate: CellState.VALID, value: '2'};
        cells[3] = {cellstate: CellState.CONSTANT, value: '4'};

        const newState = gameReducer(createGameState(GameMode.PLAY_MODE, cells, width, height), newGame());
        console.log("new state: ", newState);
        expect(newState.cells.length).toBe(width * height);
        for(let i = 0; i < newState.cells.length; i++) {
            expect(newState.cells[i].value).toBe("");
            expect(newState.cells[i].cellstate).toBe(CellState.EMPTY);
        }
    })
});

describe("reducer - anyHaveValue tests", () => {
    test("empty cells test", () => {
        expect(anyCellsHaveValue(1, [], [])).toBe(false);
    });
    test("simple cells test", () => {
        expect(anyCellsHaveValue(1, [createCell("1", CellState.VALID)], [0])).toBe(true);
    });
    test("simple false test", () => {
        expect(anyCellsHaveValue(2, [createCell("1", CellState.VALID)], [0])).toBe(false);
    });
    test("simple true test", () => {
        expect(anyCellsHaveValue(2,
            [createCell("1", CellState.VALID),
                createCell("2", CellState.VALID),
                createCell("", CellState.EMPTY)], [0, 1])).toBe(true);
    });
    test("simple false test 2", () => {
        expect(anyCellsHaveValue(2,
            [createCell("1", CellState.VALID),
                createCell("2", CellState.VALID),
                createCell("", CellState.EMPTY)], [2])).toBe(false);
    });
    test("true test", () => {
        expect(anyCellsHaveValue(3,
            [createCell("", CellState.EMPTY),
                createCell("2", CellState.INVALID),
                createCell("3", CellState.INVALID),
                createCell("2", CellState.VALID),
                createCell("3", CellState.VALID),
                createCell("", CellState.EMPTY)], [0, 1, 2, 3, 4, 5])).toBe(true);
    });
    test("false test", () => {
        expect(anyCellsHaveValue(3,
            [createCell("", CellState.EMPTY),
                createCell("2", CellState.INVALID),
                createCell("3", CellState.INVALID),
                createCell("2", CellState.VALID),
                createCell("", CellState.EMPTY),
                createCell("", CellState.EMPTY)], [0, 1, 2, 3, 4, 5])).toBe(false);
    });
    test("constant true test", () => {
        expect(anyCellsHaveValue(3,
            [createCell("", CellState.EMPTY),
                createCell("2", CellState.INVALID),
                createCell("3", CellState.CONSTANT),
                createCell("2", CellState.VALID),
                createCell("", CellState.EMPTY)], [0, 1, 2, 3, 4, 5])).toBe(true);
    });
});

describe("reducer - anyAreEmpty tests", () => {
    test("empty cells test", () => {
        expect(anyCellsAreEmptyOrInvalid( [], [])).toBe(false);
    });
    test("one empty cell test", () => {
        expect(anyCellsAreEmptyOrInvalid( [createCell("", CellState.EMPTY)], [0])).toBe(true);
    });
    test("one valid cell test", () => {
        expect(anyCellsAreEmptyOrInvalid( [createCell("1", CellState.VALID)], [0])).toBe(false);
    });
    test("one constant cell test", () => {
        expect(anyCellsAreEmptyOrInvalid( [createCell("1", CellState.CONSTANT)], [0])).toBe(false);
    });
    test("one invalid cell test", () => {
        expect(anyCellsAreEmptyOrInvalid( [createCell("1", CellState.INVALID)], [0])).toBe(true);
    });
    test("multiple cell test", () => {
        expect(anyCellsAreEmptyOrInvalid(
            [createCell("1", CellState.INVALID),
                createCell("", CellState.EMPTY),
                createCell("2", CellState.VALID)], [0,1,2]))
            .toBe(true);
    });
    test("multiple cell false test", () => {
        expect(anyCellsAreEmptyOrInvalid(
            [createCell("1", CellState.VALID),
                createCell("3", CellState.CONSTANT),
                createCell("2", CellState.VALID)], [0,1,2]))
            .toBe(false);
    });
    test("multiple cell false test", () => {
        expect(anyCellsAreEmptyOrInvalid(
            [createCell("1", CellState.EMPTY),
                createCell("", CellState.INVALID),
                createCell("2", CellState.VALID)], [2]))
            .toBe(false);
    });
});
