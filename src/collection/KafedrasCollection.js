const Backbone = require('backbone'),
      config = require('config');;

const KafedrasCollection = Backbone.Collection.extend({
});

module.exports = new KafedrasCollection(config.kafedras);
