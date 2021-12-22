import { ENTER_KEY, CHECK_ICON, CROSS_ICON } from './contants.js';

export default class View {
  clearList() {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('list'));
    range.deleteContents();
  }

  clearButtons() {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('todo-count'));
    range.deleteContents();
  }

  clearInput() {
    document.getElementById('add-item').value = '';
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
    const list = document.getElementById('list');

    list.innerHTML = template;

    // rerender button-container
    this.clearButtons();
    const todos = count;

    if (todos.total > 0) {
      const todoCount = document.getElementById('todo-count');
      const itemCount = document.createElement('p');
      const plural = todos.active === 1 ? '' : 's';
      itemCount.textContent = `${todos.active} todo${plural} left`;
      todoCount.appendChild(itemCount);
    }
  }

  bindClickCompleteItem(callback) {
    const list = document.querySelector('#list');

    list.addEventListener('click', (e) => {
      e.preventDefault();

      const button = e.target.closest('a');

      if (button && button.classList.contains('item-complete')) {
        const id = Number(button.closest('li').dataset.id);

        callback(id);
      }
    });
  }

  bindClickDeleteItem(callback) {
    const list = document.querySelector('#list');

    list.addEventListener('click', (e) => {
      e.preventDefault();

      const button = e.target.closest('a');

      if (button && button.classList.contains('item-delete')) {
        const id = Number(button.closest('li').dataset.id);

        callback(id);
      }
    });
  }

  bindClickAddItem(callback) {
    const input = document.getElementById('add-item');

    input.addEventListener('keyup', (e) => {
      e.preventDefault();

      const item = input.value.trim();

      if (e.key === ENTER_KEY) {
        if (item === '') return;

        callback(item);
      }
    });
  }
}
