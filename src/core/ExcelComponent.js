import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor(rootRef, options) {
    super(rootRef, options?.listeners);

    this.name = options?.name || '';
  }

  /** Возвращает шаблон компонента */
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}