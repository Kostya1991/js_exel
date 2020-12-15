import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';
import { ActiveRoute } from './../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-icon="delete">
          <i class="material-icons" data-icon="delete">delete</i>
        </div>

        <div class="button" data-icon="exit">
          <i class="material-icons" data-icon="exit">exit_to_app</i>
        </div>

      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.icon === 'exit') {
      ActiveRoute.navigate('');
    } else if ($target.data.icon === 'delete') {
      const id = ActiveRoute.params;
      localStorage.removeItem('excel:' + id);
      ActiveRoute.navigate('');
    }
  }
}
