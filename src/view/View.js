import { $, $all } from '../utils/helpers.js';
import { ENTER_KEY } from '../configs/contants.js';

export default class View {
  constructor(template) {
    this.template = template;
    this.$app = $('#app');
  }

  clearInput() {
    $('#add-item').value = '';
  }

  render({ todos }) {
    const count = this._getCount(todos);

    this.$app.innerHTML = this.template.getHTML(todos, count);
  }

  _getCount(todos) {
    const count = {
      active: 0,
      completed: 0,
      total: 0,
    };

    todos.forEach(function (todo) {
      if (todo.isCompleted) {
        count.completed++;
      } else {
        count.active++;
      }

      count.total++;
    });

    return count;
  }

  bindEventListener(type, selector, callback) {
    const children = [...$all(selector, this.$app)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);

    this.$app.addEventListener(type, (e) => {
      if (!isTarget(e.target)) return;

      e.preventDefault();
      callback(e);
    });
  }

  bindClickCompleteItem(callback) {
    this.bindEventListener('click', '#list', (e) => {
      const button = e.target.closest('a');

      if (!button || !button.classList.contains('item-complete')) return;

      const id = Number(button.closest('li').dataset.id);

      callback(id);
    });
  }

  bindClickDeleteItem(callback) {
    this.bindEventListener('click', '#list', (e) => {
      const button = e.target.closest('a');

      if (!button || !button.classList.contains('item-delete')) return;

      const id = Number(button.closest('li').dataset.id);

      callback(id);
    });
  }

  bindClickAddItem(callback) {
    this.bindEventListener('keyup', '#add-item', (e) => {
      if (e.key !== ENTER_KEY) return;

      const item = $('#add-item').value.trim();

      if (item === '') return;

      callback(item);
    });
  }
}
