require('colors');
const Todos = require('./models/todos');
const { saveData, readData } = require('./helpers/save-file');
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTodoFromTodoList,
  confirmDelete,
  markTodosAsComplete
} = require('./helpers/inquirer');

const main = async() => {

  let option_selected = '';

  const todos = new Todos();
  const todos_from_json = readData();

  if (todos_from_json) {
    todos.getTodosFromArray(todos_from_json);
  }

  do {
    option_selected = await inquirerMenu();

    switch (option_selected) {
      case '1':
        const description = await readInput('Description:');
        todos.createTodo(description);
      break;
      case '2':
        todos.showAllTodos();
      break;
      case '3':
        todos.showCompleteOrUncompleteTodos(true)
        break;
      case '4':
        todos.showCompleteOrUncompleteTodos(false)
      break;
      case '5':
        const ids = await markTodosAsComplete(todos.todoList);
        todos.toggleTodoComplete(ids);
      break;
      case '6':
        const id = await deleteTodoFromTodoList(todos.todoList);

        if (id !== '0') {
          const confirm = await confirmDelete('Are you sure do you want to delete?');
          if (confirm) {
            todos.deleteTodo(id);
            console.log('Todo deleted');
          }
        }
      break;
    }

    saveData(todos.todoList);

    await pause();

  } while( option_selected !== '0' )

};

main();