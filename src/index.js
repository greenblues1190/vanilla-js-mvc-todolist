import App from './App.js';
import Controller from './Controller.js';
import Model from './Model.js';
import View from './View.js';
import Store from './Store.js';
import { STORAGE_KEY } from './config.js';

const store = new Store(STORAGE_KEY);
const model = new Model(store);
const view = new View();
const controller = new Controller(model, view);
const app = new App(controller);

app.init();
