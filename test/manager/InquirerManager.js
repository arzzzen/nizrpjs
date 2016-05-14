'use strict';

const chai = require('chai'),
      chaiAsPromised = require("chai-as-promised"),
      AbstractInquirer = require('src/manager/InquirerManager/inquirer/AbstractInquirer'),
      kafedrasCollection = require('src/collection/KafedrasCollection'),
      bddStdin = require('bdd-stdin');

chai.use(chaiAsPromised);
chai.should();

const InquirerManager = require('src/manager/InquirerManager/InquirerManager');

describe('InquirerManager', function () {
  var iM;

  before(function() {
    iM = new InquirerManager('manual');
  });

  it('should be instance of inquirerManager', function() {
    iM.should.be.an.instanceOf(InquirerManager);
  });

  describe('getInquirerResult method', function() {
    it('should return Promise', function() {
      return iM.getInquirerResult().should.be.an.instanceOf(Promise);
    });
  });

  describe('ManualInquirer', function() {
    const answers = {
            kafedra: kafedrasCollection.first(),
            authors: 'Иванов И.И',
            title: 'Британские ученые доказали',
            type: 'Пособие',
            year: '2016'
          },
          userInput = ['\n',
            answers.authors, '\n',
            answers.title, '\n',
            answers.type, '\n',
            String(answers.year), '\n'];

    it('should be instance of AbstractInquirer', function() {
      iM.inquirer.should.be.an.instanceOf(AbstractInquirer);
    });

    it('should return answers for manual inquirer', function () {
      bddStdin.call(bddStdin, userInput);

      return iM.getInquirerResult().should.eventually
        .to.deep.equal(answers);
    });
  });
});
