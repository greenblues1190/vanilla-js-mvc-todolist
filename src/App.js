model = {
  items: [],

  getCount: function () {
    var todos = {
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
  },
};

view = {
  ENTER_KEY: 13,
  checkIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>`,
  crossIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg>`,

  clearList: function () {
    var range = document.createRange();
    range.selectNodeContents(document.getElementById('list'));
    range.deleteContents();
  },

  clearButtons: function () {
    var range = document.createRange();
    range.selectNodeContents(document.getElementById('todo-count'));
    range.deleteContents();
  },

  render: function () {
    // clear list and rerender
    this.clearList();
    if (model.items.length > 0) {
      list = document.getElementById('list');
      for (var i = 0; i < model.items.length > 0; i++) {
        item = document.createElement('li');
        label = document.createElement('p');
        icons = document.createElement('div');
        check = document.createElement('a');
        cross = document.createElement('a');

        item.className = 'item';
        label.className = 'item-text';
        check.className = 'item-complete';
        cross.className = 'item-delete';

        label.textContent = model.items[i].text;

        if (model.items[i].isCompleted) {
          label.setAttribute(
            'style',
            'text-decoration: line-through; color: #bbb;',
          );
        }

        icons.setAttribute('class', 'icon-container');

        check.setAttribute('onclick', `controller.completeItem(${i})`);
        cross.setAttribute('onclick', `controller.deleteItem(${i})`);

        check.innerHTML = this.checkIcon;
        cross.innerHTML = this.crossIcon;
        icons.appendChild(check);
        icons.appendChild(cross);

        item.appendChild(icons);
        item.appendChild(label);

        list.appendChild(item);
      }
    }

    // rerender button-container
    this.clearButtons();
    todos = model.getCount();
    if (todos.total > 0) {
      todoCount = document.getElementById('todo-count');
      itemCount = document.createElement('p');
      var plural = todos.active === 1 ? '' : 's';
      itemCount.textContent = `${todos.active} todo${plural} left`;
      todoCount.appendChild(itemCount);


    }
  },

  addItem: function (e) {
    if (e.keyCode === this.ENTER_KEY) {
      var input = document.getElementById('add-item');
      if (input.value.trim() !== '') {
        controller.addItem(input.value.trim());
      }
    }
  },
};

controller = {
  init: function () {
    view.render();
  },

  addItem: function (item) {
    newItem = {
      text: item,
      isCompleted: false,
    };
    model.items.push(newItem);
    document.getElementById('add-item').value = '';
    view.render();
  },

  completeItem: function (itemId) {
    model.items[itemId].isCompleted = !model.items[itemId].isCompleted;
    view.render();
  },

  deleteItem: function (itemId) {
    model.items.splice(itemId, 1);
    view.render();
  },
};
