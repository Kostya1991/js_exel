import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });

    this.$root = $root;
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" id="formula__input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();
    this.formulaRef = this.$root.find('#formula__input');

    this.on('table:select', cellRef => {
      this.formulaRef.text(cellRef.text());
    });

    this.on('table:input', cellRef => {
      this.formulaRef.text(cellRef.text());
    });
  }

  onInput(event) {
    this.emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.code)) {
      event.preventDefault();
      this.emit('formula:blur');
    }
  }
}