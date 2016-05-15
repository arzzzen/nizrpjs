'use strict';

const chai = require('chai'),
      chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const genExec = require('src/utils/genExec');
describe('genExec', function () {
  var gen,
      promiseFactory = function(time) {
        return new Promise(resolve => setTimeout(() => resolve(time), time));
      };
  before(function () {
    gen = function* (time) {
        for (let iterator of [1,2,3]) {
          time = yield promiseFactory(time+10*iterator);
        }
        return time;
    };
  });
  it('should run generators in predictable manner', function () {
    genExec(gen('500')).should.eventually.equal(1060);
  });
});
