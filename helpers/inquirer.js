const inquirer = require('inquirer');
require('colors');

const menu_options = [
  {
    type:    'list',
    name:    'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: '1',
        name: `${ '1.'.green } Create todo`
      },
      {
        value: '2',
        name: `${ '2.'.green } Show all todos`
      },
      {
        value: '3',
        name: `${ '3.'.green } Show complete todos`
      },
      {
        value: '4',
        name: `${ '4.'.green } Show uncomplete todos`
      },
      {
        value: '5',
        name: `${ '5.'.green } Mark a todo(s) as complete`
      },
      {
        value: '6',
        name: `${ '6.'.green } Delete todo`
      },
      {
        value: '0',
        name: `${ '0.'.green } End`
      },
    ]
  }
];

const inquirerMenu = async() => {

  console.clear();

  console.log('======================='.green);
  console.log('   Select an option'.white);
  console.log('=======================\n'.green);

  const { option } = option_selected = await inquirer.prompt(menu_options);

  return option;
};

const pause = async() => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${ 'ENTER'.yellow } to continue`
    }
  ];

  console.log('\n');
  await inquirer.prompt(question);
}

const readInput = async(message) => {

  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate( value ) {
        if (value.length === 0) return 'Please, type a value';

        return true;
      }
    },
  ];

  const { description } = await inquirer.prompt(question);

  return description;
}

const deleteTodoFromTodoList = async(todos = []) => {

  const choices = todos.map((todo, index) => {
    const idx = `${ index + 1 }.`.green;

    return {
      value: todo.id,
      name: `${ idx } ${ todo.description }`
    }
  });

  choices.unshift({
    value: '0',
    name: '0'.green + '. Cancel'
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ];

  const { id } = await inquirer.prompt(questions);

  return id;
}

const confirmDelete = async(message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
}

const markTodosAsComplete = async(todos = []) => {

  const choices = todos.map((todo, index) => {

    const idx = `${ index + 1 }.`.green;

    return {
      value: todo.id,
      name: `${ idx } ${ todo.description }`,
      checked: (todo.complete_date) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTodoFromTodoList,
  confirmDelete,
  markTodosAsComplete
};