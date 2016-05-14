'use strict';

const TaskRunner = require('src/task/TaskRunner'),
      inquirer = require('inquirer'),
      questions = [{
        type: 'list',
        name: 'action',
        message: 'Что пожелаешь?',
        choices: [
          {
            name: 'Выложить методички',
            value: 'manual'
          },
          {
            name: 'Выход',
            value: 'exit'
          }
        ]
      }],
      promiseLoop = function(pGen) {
        return pGen().then(() => promiseLoop(pGen));
      },
      taskPromiseGen = function () {
        let prom = inquirer.prompt(questions).then(answers => {
          let {action} = answers;
          action === 'exit' && process.exit();
          let runner = new TaskRunner(action);
          return runner.runTask();
        });
        return prom;
      };

promiseLoop(taskPromiseGen);
