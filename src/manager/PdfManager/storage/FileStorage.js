const config = require('config'),
      fs = require('fs'),
      path = require('path');

class FileStorage {
  getPdfs() {
    var prom = new Promise((resolve, reject) => {
      fs.readdir(this._getDir(), (err, files) => {
        var pdfFiles = [];
        if (err) {
          return reject(err);
        }
        for (let file of files) {
          path.extname(file) === '.pdf' && pdfFiles.push(this._getDir()+file);
        }
        resolve(pdfFiles);
      });
    });
    return prom;
  }
  _getDir() {
    return config.pdfsPath;
  }
}

module.exports = FileStorage;