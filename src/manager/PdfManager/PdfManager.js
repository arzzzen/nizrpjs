const FileStorage = require('./storage/FileStorage'),
      EmailStorage = require('./storage/EmailStorage');

class PdfManager {
  constructor(storage = 'file') {
    switch(storage) {
      case 'file':
        this.storage = new FileStorage();
        break;
      case 'email':
        this.storage = new EmailStorage();
        break;
    }
  }
  getPdfs() {
    return this.storage.getPdfs();
  }
}

module.exports = PdfManager;