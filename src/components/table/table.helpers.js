import { $ } from '../../core/Dom';

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function range(start, end) {
  if (start < end) {
    [start, end] = [end, start];
  }

  const arr = new Array(start - end + 1)
      .fill('')
      .map((_, index) => end + index);

  return arr;
}

export function matrix(event, selection) {
  const cellRef = $(event.target);
  const target = cellRef.getDataAttribute('id', true);
  const current = selection.current.getDataAttribute('id', true);

  const rows = range(current.row, target.row);
  const cols = range(current.col, target.col);

  const idx = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);

  return idx;
}

export function nextCell(event, {row, col}) {
  const MIN_VALUE = 1;

  switch(event.key) {
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
  }

  return `[data-id="${row}:${col}"]`;
}
