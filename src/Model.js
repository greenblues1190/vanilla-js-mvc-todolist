export default class Model {
  constructor() {
    this.items = [];
  }

  getCount() {
    const todos = {
      active: 0,
      completed: 0,
      total: 0,
    };

    this.items.forEach(function (todo) {
      if (todo.isCompleted) {
        todos.completed++;
      } else {
        todos.active++;
      }

      todos.total++;
    });

    return todos;
  }
}
