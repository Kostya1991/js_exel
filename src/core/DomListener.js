import { capitalize } from '@core/utils';

export class DomListener {
  constructor(rootRef, listeners = []) {
    if (!rootRef) {
      throw new Error('No provide for DomListener');
    }
    this.rootRef = rootRef;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodPreffix(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
      }
      this[method] = this[method].bind(this);
      this.rootRef.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodPreffix(listener);
      this.rootRef.remove(listener, this[method]);
    });
  }
}

function getMethodPreffix(eventName) {
  return 'on' + capitalize(eventName);
}
