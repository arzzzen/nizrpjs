const AbstractPage = require('./AbstractPage');

class EbmuMPage extends AbstractPage {
  constructor() {
    super('/ebmu_m.htm');
  }
  incrementManualsCounter(incValue = 1) {
    let $manualCounter = this.$('.manualsCounter');
    if (!$manualCounter.length) {
      throw Error('Can\'t increase manuals counter - no counter selector');
    }
    let conterValue = parseInt($manualCounter.html());
    $manualCounter.html(conterValue+incValue);
    this.save();
  }
}

module.exports = EbmuMPage;
