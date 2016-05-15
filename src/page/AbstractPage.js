const cheerio = require('cheerio'),
      fs = require('fs'),
      config = require('config');

class AbstractPage {
  constructor(url) {
    this.url = url;
    this.file = config.projectDir + this.url;
    fs.accessSync(this.file);
    this.$ = this._getPageHtml();
  }
  _getPageHtml() {
    let page = fs.readFileSync(this.file);
    return cheerio.load(page, {decodeEntities: false});
  }
  save() {
    fs.writeFileSync(this.file, this.$.html());
  }
}

module.exports = AbstractPage;
