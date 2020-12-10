import { ExcelComponent } from './ExcelComponent';

export class ExcelState extends ExcelComponent {
  constructor($root, ...args) {
    super($root, ...args);
    this.$root = $root;
  }

  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  initState(state = {}) {
    this.state = { ...state };
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
  }
}
