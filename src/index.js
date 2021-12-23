import App from './App.js';
import Controller from './controller/Controller.js';
import Model from './model/Model.js';
import View from './view/View.js';
import Template from './template/Template.js';
import Store from './store/Store.js';
import { STORAGE_KEY } from './configs/configs.js';

const store = new Store(STORAGE_KEY);
const model = new Model(store);
const template = new Template();
const view = new View(template);
const controller = new Controller(model, view);
const app = new App(controller);

app.init();
