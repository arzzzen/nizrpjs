'use strict';

const chai = require('chai'),
      chaiAsPromised = require('chai-as-promised'),
      Backbone = require('backbone'),
      config = require('config');

chai.use(chaiAsPromised);
chai.should();

describe('Collections', function () {
  describe('KafedrasCollection', function () {
    const kC = require('src/collection/KafedrasCollection');

    it('should be an instance of Backbone.Collection', function () {
      kC.should.be.an.instanceOf(Backbone.Collection);
    });

    it('should have length equal to kafedras from config', function () {
      kC.length.should.be.equal(config.kafedras.length);
    });
  });
});
