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
    this.$app.innerHTML = this.template.getHTML(todos, this._getCount(todos));
  }

  _getCount(todos) {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.isCompleted).length;
    const active = total - completed;

    return { total, completed, active };
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
