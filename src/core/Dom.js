class Dom {
  constructor(selector) {
    this.elementRef = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.elementRef.innerHTML = html;
      return this;
    }
    return this.elementRef.outerHTML.trim();
  }

  on(eventType, callback) {
    this.elementRef.addEventListener(eventType, callback);
  }

  remove(eventType, callback) {
    this.elementRef.removeEventListener(eventType, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  closest(selector) {
    return $(this.elementRef.closest(selector));
  }

  getCoords() {
    return this.elementRef.getBoundingClientRect();
  }

  findAll(selector) {
    return this.elementRef.querySelectorAll(selector);
  }

  find(selector) {
    return this.elementRef.querySelector(selector);
  }

  css(styles = {}) {
    Object
      .keys(styles)
      .forEach(key => {
        this.elementRef.style[key] = styles[key]
      });
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.elementRef;
    }

    if (Element.prototype.append) {
      this.elementRef.append(node);
    } else {
      this.elementRef.appendChild(node);
    }

    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const elementRef = document.createElement(tagName);
  if (classes) {
    elementRef.classList.add(classes);
  }

  return $(elementRef);
}