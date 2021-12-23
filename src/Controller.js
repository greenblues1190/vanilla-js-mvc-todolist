export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindClickAddItem(this.addItem.bind(this));
    this.view.bindClickCompleteItem(this.completeItem.bind(this));
    this.view.bindClickDeleteItem(this.deleteItem.bind(this));
  }

  initView() {
    this.model.init((result) => {
      this.view.render(result);
    });
  }

  addItem(item) {
    this.model.addItem(item, (result) => {
      this.view.clearInput();
      this.view.render(result);
    });
  }

  completeItem(id) {
    this.model.completeItem(id, (result) => {
      this.view.render(result);
    });
  }

  deleteItem(id) {
    this.model.deleteItem(id, (result) => {
      this.view.render(result);
    });
  }
}
