import React from 'react';
import {gameReducer, getCellsToCheck} from "./gameReducer";
import {CellState, Cell, GameMode} from "../types";
import {clearBoard} from "./gameActions";

describe("get cells to check tests", () => {
    const width = 4;
    const height = 4;

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

describe("reducer - clear board tests", () => {
    test("basic clear board test", ()  => {
        const width = 4;
        const height = 4;
        const newState = gameReducer({mode: GameMode.SETUP_MODE, cells: EMPTY_BOARD, width, height}, clearBoard());
        console.log("new state: " , newState);
        expect(newState.cells.length).toBe(width * height);
        for(let i = 0; i < newState.cells.length; i++) {
            expect(newState.cells[i].value).toBe("");
            expect(newState.cells[i].cellstate).toBe(CellState.EMPTY);
        }
    })
})