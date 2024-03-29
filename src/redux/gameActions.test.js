import React from 'react';
import {
  cellChange,
  checkBoard,
  clearBoard,
  GAME_CELL_CHANGE, GAME_CHECK_BOARD,
  GAME_CLEAR_BOARD, GAME_NEW,
  GAME_START, newGame,
  startGame,
  resizeBoard, GAME_RESIZE_BOARD
} from "./gameActions";

describe("action creator tests", () => {
  test('creates valid resize board action', () => {
    const width = "4";
    const height = "5";
    const cellChangeAction = resizeBoard(width, height);
    expect(cellChangeAction).hasOwnProperty("type");
    expect(cellChangeAction.type).toEqual(GAME_RESIZE_BOARD);
    expect(cellChangeAction).hasOwnProperty("payload");
    expect(cellChangeAction.payload.width).toBe(width);
    expect(cellChangeAction.payload.height).toBe(height);
  });

  test('creates valid cell change action', () => {
    const cellChangeAction = cellChange(0, "1");
    expect(cellChangeAction).hasOwnProperty("type");
    expect(cellChangeAction.type).toEqual(GAME_CELL_CHANGE);
    expect(cellChangeAction).hasOwnProperty("payload");
    expect(cellChangeAction.payload.value).toBe("1");
    expect(cellChangeAction.payload.index).toBe(0);
  });

  test("creates clear board action", () => {
    const clearBoardAction = clearBoard();
    expect(clearBoardAction).hasOwnProperty("type");
    expect(clearBoardAction.type).toBe(GAME_CLEAR_BOARD);
  });

  test("creates start game action", () => {
    const action = newGame();
    expect(action).hasOwnProperty("type");
    expect(action.type).toBe(GAME_NEW);
  });

  test("creates start game action", () => {
    const startGameAction = startGame();
    expect(startGameAction).hasOwnProperty("type");
    expect(startGameAction.type).toBe(GAME_START);
  });

  test("creates check board action", () => {
    const checkBoardAction = checkBoard();
    expect(checkBoardAction).hasOwnProperty("type");
    expect(checkBoardAction.type).toBe(GAME_CHECK_BOARD);
  });
});
