const inquirer = require('inquirer');

class AbstractInquirer {
  getResult() {
    return inquirer.prompt(this._getQuestions());
  }
  _getQuestions() {
    return this.questions;
  }
}

module.exports = AbstractInquirer;
