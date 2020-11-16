import { $ } from '../../core/Dom';

export function resizeTable(rootRef, event) {
  if (event.target.dataset.resize) {
    const resizer = $(event.target);
    const parentRef = resizer.closest('[data-type="resizable"]');
    const cells = rootRef.findAll(`[data-col="${parentRef.elementRef.textContent.trim()}"]`);
    const coords = parentRef.getCoords();
    const type = resizer.elementRef.dataset.resize;

    const optionPosition = type === 'col' ? 'bottom' : 'right';

    resizer.css({
      zIndex: 2000,
      [optionPosition]: '-2000px',
      opacity: 1
    });

    let value = null;

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = Math.floor(e.pageX - coords.right);
        value = coords.width + delta;
        resizer.css({right: -delta + 'px'});
      } else {
        const delta = Math.floor(e.pageY - coords.bottom);
        value = coords.height + delta;
        resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      resizer.css({
        zIndex: 2000,
        right: 0,
        opacity: 0,
        bottom: 0
      });

      if (type === 'col') {
        cells.forEach(cell => {
          cell.style.width = value + 'px';
        });
      } else {
        parentRef.css({height: value + 'px'});
      }
    };
  }
}