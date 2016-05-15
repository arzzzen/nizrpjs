const AbstractPage = require('./AbstractPage'),
      _ = require('lodash'),
      config = require('config');

/*jshint unused: vars */
class KafedraPage extends AbstractPage {
  constructor(kafedra) {
    super(kafedra.getUrl());
    this.kafedra = kafedra;
    this.$manualsList = this.$('ol').first();
  }
  addManual({authors, title, pdfUrl, type, year}) {
    var manualTpl = _.template(config.manualTemplate);
    this.$manualsList.prepend( manualTpl(arguments[0]) );
    this.save();
  }
}

module.exports = KafedraPage;
