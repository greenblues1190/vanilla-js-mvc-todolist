const ENTER_KEY = 13;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
</svg>`;
const CROSS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg>`;

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

  render(items, count) {
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

      if (button.classList.contains('item-complete')) {
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

      if (button.classList.contains('item-delete')) {
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

      if (e.key === 'Enter') {
        if (item === '') {
          return;
        }

        callback(item);
      }
    });
  }
}
