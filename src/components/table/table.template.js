const CODES = {
  A: 65,
  Z: 90
};

function createRow(content, index = "") {
  return `
    <div class="table__row">
      <div class="row-info">${index}</div>
      <div class="row__data">${content}</div>
    </div>
  `;
};

function createCol(col) {
  return `
    <div class="data__column">
      ${col}
    </div>
  `;
};

function createCell(value = "") {
  return `
    <div class="cell" contenteditable>
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
    .map(element => createCol(element))
    .join('');

  const rows = new Array(colsCount)
    .fill('')
    .map((_, index) => index + 1)
    .map(() => createCell())
    .join('');
    
  html.push(createRow(cols));

  for (let i = 0; i <rowsCount; i++) {
    html.push(createRow(rows, i + 1));
  }

  return html.join('');
}