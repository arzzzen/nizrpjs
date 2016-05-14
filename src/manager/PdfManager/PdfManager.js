const FileStorage = require('./storage/FileStorage'),
      EmailStorage = require('./storage/EmailStorage');

class PdfManager {
  constructor(storage) {
    switch(storage) {
      case 'file':
        this.storage = new FileStorage();
        break;
      case 'email':
        this.storage = new EmailStorage();
        break;
      default:
        throw Error('Set correct storage');
    }
  }
  getPdfs() {
    return this.storage.getPdfs();
  }
}

module.exports = PdfManager;
