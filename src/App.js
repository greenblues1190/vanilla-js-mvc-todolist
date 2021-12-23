export default class App {
  constructor(controller) {
    this.controller = controller;
  }

  init() {
    this.controller.initView();
  }
}
