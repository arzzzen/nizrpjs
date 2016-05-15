'use strict';

const chai = require('chai'),
      chaiAsPromised = require('chai-as-promised'),
      TaskRunner = require('src/task/TaskRunner');

chai.use(chaiAsPromised);
chai.should();

describe('ManualRunner', function () {
  var mR;
  before(function () {
    mR = new TaskRunner('manual');
  });
  it('should run task to publish manual');
});
