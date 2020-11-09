import { $ } from "@core/Dom";

export class Excel {
  constructor(selector, options) {
    this.elementRef = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const rootRef = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const elementRef = $.create('div', Component.className);
      const component = new Component(elementRef);
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
}