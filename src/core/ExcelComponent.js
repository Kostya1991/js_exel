import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor(rootRef, options) {
    super(rootRef, options?.listeners);

    this.name = options?.name || '';
    this.emitter = options?.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  /** Настраивает компонент до инициализации */
  prepare() {}

  /** Возвращает шаблон компонента */
  toHTML() {
    return '';
  }

  /** Уведомляем слушателей о обновлениях */
  emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  /** Подписываемся на события */
  on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  /** Добавляем дом слушатели */
  init() {
    this.initDOMListeners();
  }

  /** Удаляем компонент, чистим слушатели */
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}