import { $, $all } from './helpers.js';
import { ENTER_KEY, CHECK_ICON, CROSS_ICON } from './contants.js';

export default class View {
  constructor() {
    this.$app = $('#app');
  }
  clearList() {
    const range = document.createRange();
    range.selectNodeContents($('#list'));
    range.deleteContents();
  }

  clearButtons() {
    const range = document.createRange();
    range.selectNodeContents($('#todo-count'));
    range.deleteContents();
  }

  clearInput() {
    $('#add-item').value = '';
  }

  render({ items, count }) {
    // clear list and rerender
    this.clearList();

    const li = (id, item) => `
      <li class='item' data-id='${id}'>
        <div class='icon-container'>
          <a class='item-complete'>${CHECK_ICON}</a>
          <a class='item-delete'>${CROSS_ICON}</a>
        </div>
        <p
          class='item-text'
          ${
            item.isCompleted &&
            `style='text-decoration: line-through; color: #bbb;'`
          }
        >
          ${item.text}
        </p>
      </li>
    `;

    const template = items.map((item, id) => li(id, item)).join('');
    const list = $('#list');

    list.innerHTML = template;

    // rerender button-container
    this.clearButtons();

    const todos = count;

    if (todos.total > 0) {
      const todoCount = $('#todo-count');
      const itemCount = document.createElement('p');
      const plural = todos.active === 1 ? '' : 's';
      itemCount.textContent = `${todos.active} todo${plural} left`;
      todoCount.appendChild(itemCount);
    }
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
