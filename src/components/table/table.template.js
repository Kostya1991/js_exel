const CODES = {
  A: 65,
  Z: 90
};

function createRow(content, index = '') {
  const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
  return `
    <div class="table__row" data-type="resizable" data-row="${index}">
      <div class="row-info">
        ${index}
        ${resizer}
      </div>
      <div class="row__data">${content}</div>
    </div>
  `;
}

function createCol(col) {
  return `
    <div class="data__column" data-type="resizable" data-col=${col}>
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createCell(charCode, col, row, value = '') {
  return `
    <div 
      class="cell" 
      data-col="${charCode}" 
      data-type="cell" 
      data-id="${row}:${col}" 
      contenteditable
    >
      ${value}
    </div>
  `;
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const html = [];

  const cols = new Array(colsCount)
      .fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
      .map((element, index) => createCol(element))
      .join('');

  html.push(createRow(cols));

  for (let i = 0; i <rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((_, index) => index + 1)
        .map((_, index) => createCell(String.fromCharCode(CODES.A + index), index + 1, i + 1))
        .join('');
    html.push(createRow(cells, i + 1));
  }

  return html.join('');
}