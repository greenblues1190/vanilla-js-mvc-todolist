export default class Model {
  constructor(store) {
    this.store = store;
  }

  init(callback) {
    const todos = this.store.load();

    callback(this._getResult(todos));
  }

  addItem(item, callback) {
    const todos = this.store.load();
    const newItem = {
      text: item,
      isCompleted: false,
    };

    todos.push(newItem);
    this.store.save(todos);
    callback(this._getResult(todos));
  }

  completeItem(id, callback) {
    const todos = this.store.load();

    todos[id].isCompleted = !todos[id].isCompleted;
    this.store.save(todos);
    callback(this._getResult(todos));
  }

  deleteItem(id, callback) {
    const todos = this.store.load();

    todos.splice(id, 1);
    this.store.save(todos);
    callback(this._getResult(todos));
  }

  _getResult(todos) {
    return {
      todos: [...todos],
      count: this._getCount(todos),
    };
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
}
