export default class Model {
  constructor() {
    this.items = [];
  }

  addItem(item, callback) {
    const newItem = {
      text: item,
      isCompleted: false,
    };

    this.items.push(newItem);

    callback(this._getResult());
  }

  completeItem(id, callback) {
    this.items[id].isCompleted = !this.items[id].isCompleted;

    callback(this._getResult());
  }

  deleteItem(id, callback) {
    this.items.splice(id, 1);

    callback(this._getResult());
  }

  _getResult() {
    return {
      items: [...this.items],
      count: this._getCount(),
    };
  }

  _getCount() {
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
