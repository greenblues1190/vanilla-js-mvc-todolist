import Model from './Model.js';
import View from './View.js';
import Controller from './Controller.js';
import App from './App.js';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

new App(controller);
