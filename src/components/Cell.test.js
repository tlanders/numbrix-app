import React from 'react';
import {render, screen} from '@testing-library/react';
import Cell from "./Cell";
import {CellState} from "../types";

test('renders empty cell', () => {
  const { getByDisplayValue } = render(<Cell cellstate={CellState.EMPTY} value={''} onChange={() => {}}/>);
  screen.debug();
  const inputElement = getByDisplayValue('');
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveClass('numbrix-cell');
  expect(inputElement).toHaveAttribute("type", "text");
});
