'use strict';

const Backbone = require('backbone');

const KafedraModel = Backbone.Model.extend({
  getUrl() {
    return `/${this.get('alias')}.htm`;
  },
  getManualsUrl() {
    return '/metod/'+this.get('alias')+'/';
  }
});

module.exports = KafedraModel;
