const { uid } = require('uid');

class Todo {

  id = '';
  description   = '';
  complete_date = null;

  constructor(description) {
    this.id = uid();
    this.description   = description;
    this.complete_date = null;
  };

};

module.exports = Todo;