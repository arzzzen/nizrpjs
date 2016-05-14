const ManualRunner = require('./runner/ManualRunner');

class TaskRunner {
  constructor(task) {
    switch (task) {
      case 'manual':
        this.runner = new ManualRunner();
        break;
      default:
        throw Error('Set correct runner');
    }
  }
  runTask() {
    return this.runner.run();
  }
}

module.exports = TaskRunner;
