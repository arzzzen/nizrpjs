const Backbone = require('backbone'),
      config = require('config'),
      KafedraModel = require('src/model/KafedraModel');

const KafedrasCollection = Backbone.Collection.extend({
  model: KafedraModel
});

module.exports = new KafedrasCollection(config.kafedras);
