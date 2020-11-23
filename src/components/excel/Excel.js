import { $ } from '@core/Dom';
import { Emitter } from './../../core/Emmiter';

export class Excel {
  constructor(selector, options) {
    this.elementRef = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const rootRef = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map(Component => {
      const elementRef = $.create('div', Component.className);
      const component = new Component(elementRef, componentOptions);
      elementRef.html(component.toHTML());
      rootRef.append(elementRef);

      return component;
    });

    return rootRef;
  }

  render() {
    this.elementRef.append(this.getRoot());

    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}