import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor(rootRef) {
    super(rootRef, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(this.rootRef);
    console.log('Formula: onInput', event.target.textContent.trim());
  }

  onClick() {

  }
}