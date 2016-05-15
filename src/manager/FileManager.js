const config = require('config'),
      fs = require('fs'),
      path = require('path');

class FileManager {
  moveToProject(filePath, projectTargettDir, newName = null) {
    var newPath = config.projectDir + projectTargettDir + '/';
    newPath += newName || path.basename(filePath);
    fs.renameSync(path.normalize(filePath), path.normalize(newPath));
    return newPath;
  }
  getNextIndex(dir, extension) {
    var files = fs.readdirSync(dir),
        indexes = [];

    for (let file of files) {
      if (path.extname(file) === extension) {
        indexes.push(path.basename(file, extension));
      }
    }

    return Math.max.apply(Math, indexes)+1;
  }
}

module.exports = new FileManager();
