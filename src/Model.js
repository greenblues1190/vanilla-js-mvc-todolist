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
    };
  }
}
