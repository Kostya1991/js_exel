import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options,
    });
  }

  toHTML() {
    return `
      <input type="text" value="Новая талица" class="excel__input" />
      <div>
          <div class="excel__button">
              <span class="material-icons">
                  delete
              </span>
          </div>

          <div class="excel__button">
              <span class="material-icons">
                  exit_to_app
              </span>
          </div>
      </div>
    `;
  }
}