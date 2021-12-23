import { CHECK_ICON, CROSS_ICON } from './contants.js';

export default class Template {
  constructor() {
    this.header = `
      <header>
        <h1>TodoList</h1>
      </header>
    `;

    this.footer = `
      <footer>
        <p>
          2021, <a href="https://github.com/greenblues1190">Jeongmin Woo</a>
        </p>
        <a href="https://woojeongmin.com">woojeongmin.com</a>
      </footer>
    `;
  }

  getHTML(todos, count) {
    return `
      ${this.header}
      ${this.todoListContainer(todos, count)}
      ${this.footer}
    `;
  }

  todoListContainer(todos, count) {
    const input = `
      <input
        type="text"
        name="item"
        id="add-item"
        placeholder="Add a todo item"
        autofocus
      />
    `;

    return `
      <section class="todolist-container">
        <div class="todo">
          ${input}
          ${this.todoCount(count)}
          ${this.todoList(todos)}
        </div>
      </section>
    `;
  }

  todoList(todos) {
    const li = (id, todo) => `
      <li class='item' data-id='${id}'>
        <div class='icon-container'>
          <a class='item-complete'>${CHECK_ICON}</a>
          <a class='item-delete'>${CROSS_ICON}</a>
        </div>
        <p
          class='item-text'
          ${
            todo.isCompleted &&
            `style='text-decoration: line-through; color: #bbb;'`
          }
        >
          ${todo.text}
        </p>
      </li>
    `;

    return `
      <ul id="list">
        ${todos.map((todo, id) => li(id, todo)).join('')}
      </ul>
    `;
  }

  todoCount(count) {
    const plural = count.active === 1 ? '' : 's';

    return count.total > 0
      ? `
      <div id="todo-count">
        <p>${count.active} todo${plural} left</p>
      </div>
    `
      : '';
  }
}
