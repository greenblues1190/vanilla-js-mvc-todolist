export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.render(this.model.items, this.model.getCount());
    this.view.bindClickAddItem(this.addItem.bind(this));
    this.view.bindClickCompleteItem(this.completeItem.bind(this));
    this.view.bindClickDeleteItem(this.deleteItem.bind(this));
  }

  addItem(item) {
    const newItem = {
      text: item,
      isCompleted: false,
    };

    this.model.items.push(newItem);
    document.getElementById('add-item').value = '';
    this.view.render(this.model.items, this.model.getCount());
  }

  completeItem(id) {
    this.model.items[id].isCompleted = !this.model.items[id].isCompleted;
    this.view.render(this.model.items, this.model.getCount());
  }

  deleteItem(id) {
    this.model.items.splice(id, 1);
    this.view.render(this.model.items, this.model.getCount());
  }
}
