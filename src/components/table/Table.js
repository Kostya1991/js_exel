import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';
import { TableSelection } from './TableSelection';
import { $ } from '../../core/Dom';
import { isCell, matrix, nextCell } from './table.helpers';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });

    this.$root = $root;
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const cellRef = this.$root.find('[data-id="1:1"]');
    this.selectCell(cellRef);

    this.on('formula:input', text => {
      this.selection.current.text(text);
    });

    this.on('formula:blur', () => {
      this.selection.current.focus();
    });
  }

  selectCell(cellRef) {
    this.selection.select(cellRef);
    this.emit('table:select', cellRef);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeTable(this.$root, event);
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const cellsRef = matrix(event, this.selection)
            .map(cell => this.$root.find(`[data-id="${cell}"]`));
        this.selection.selectGroup(cellsRef);
      } else {
        const cellRef = $(event.target);
        this.selection.select(cellRef);
      }
    }
  }

  onInput(event) {
    this.emit('table:input', $(event.target));
  }

  onKeydown(event) {
    const KEY_CODES = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft'
    ];

    if (KEY_CODES.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const current = this.selection.current.getDataAttribute('id', true);
      const nextCellRef = this.$root.find(nextCell(event, current));
      this.selectCell(nextCellRef);
    }
  }
}
