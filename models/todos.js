const Todo = require('./todo');

class Todos {

  _list = {};

  get todoList() {
    const todo_list = [];

    Object.keys(this._list).forEach(key => {
      const todo = this._list[key];
      todo_list.push(todo)
    });

    return todo_list;
  }

  constructor() {
    this._list = {};
  }

  getTodosFromArray(todos = []) {
    todos.forEach(todo => this._list[todo.id] = todo);
  }

  createTodo(todo_description = '') {
    const todo = new Todo(todo_description);
    this._list[todo.id] = todo;
  }

  showAllTodos() {

    console.log(); // for making a space in top

    this.todoList.forEach((todo, index) => {
      const idx = `${ index + 1 }`.green;
      const { description, complete_date } = todo;

      console.log(`${ idx }. ${ description } :: ${ complete_date === null ? 'In Process'.yellow : 'Complete'.green }`);
    });
  }

  showCompleteOrUncompleteTodos( show_only_completes = true ) {

    console.log();

    let idx = 0;

    this.todoList.forEach((todo, index) => {
      const { description, complete_date } = todo;
      const todo_state = (complete_date)
                       ? 'Complete'.green
                       : 'In Procress'.yellow;

      if (show_only_completes) {
        if (complete_date) {
          idx += 1;
          console.log(`${ (idx + '.').green } ${ description } :: ${ complete_date.yellow }`);
        }
      } else {
        if (!complete_date) {
          idx += 1;
          console.log(`${ (idx + '.').green } ${ description } :: ${ todo_state }`);
        }
      }
    });
  }

  deleteTodo(id = '') {

    if (this._list[id]) {
      delete this._list[id];
    }

  }

  toggleTodoComplete(ids = []) {

    ids.forEach(id => {

      const todo = this._list[id];

      if (!todo.complete_date) {
        todo.complete_date = new Date().toISOString();
      }

    });

    this.todoList.forEach(todo => {

      if ( !ids.includes(todo.id) ) {
        this._list[todo.id].complete_date = null;
      }

    });

  }

};

module.exports = Todos;