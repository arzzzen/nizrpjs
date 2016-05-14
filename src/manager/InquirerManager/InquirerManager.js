const ManualInquirer = require('./inquirer/ManualInquirer');

class InquirerManager {
  constructor(inquirer) {
    switch(inquirer) {
      case 'manual':
        this.inquirer = new ManualInquirer();
        break;
      default:
        throw Error('Set correct inquirer');
    }
  }
  getInquirerResult() {
    return this.inquirer.getResult();
  }
}

module.exports = InquirerManager;
