export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select(elementRef) {
    this.clearGroup();
    elementRef.focus().addClass(TableSelection.className);
    this.current = elementRef;
    this.group.push(elementRef);
  }

  selectGroup(group = []) {
    this.clearGroup();
    this.group = group;
    group.forEach(elRef => elRef.addClass(TableSelection.className));
  }

  clearGroup() {
    this.group.forEach(cellRef => cellRef.removeClass(TableSelection.className));
    this.group = [];
  }
}