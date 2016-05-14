const AbstractInquirer = require('./AbstractInquirer'),
      kafedrasCollection = require('src/collection/KafedrasCollection');

class ManualInquirer extends AbstractInquirer {
  constructor() {
    super();
    let kafedrasChoices = kafedrasCollection.map((kafedra) => {
        return {
          name: kafedra.get('title'),
          value: kafedra
        };
      });
    this.alias = 'manual';
    this.questions = [
      {
        type: 'list',
        name: 'kafedra',
        message: 'Выбери кафедру',
        choices: kafedrasChoices
      },
      {
        name: 'authors',
        message: 'Авторы'
      },
      {
        name: 'title',
        message: 'Название'
      },
      {
        name: 'type',
        message: 'Тип'
      },
      {
        name: 'year',
        message: 'Год',
        default: String(new Date().getFullYear())
      }
    ];
  }
}

module.exports = ManualInquirer;
