'use strict';

const chai = require('chai'),
      fs = require('fs'),
      mockFs = require('mock-fs'),
      config = require('config'),
      chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const fM = require('src/manager/FileManager');

describe('FileManager', function () {
  var filePath = '/tmp/old_name.txt',
      targetDir = '/test',
      newName = 'new_name.txt',
      absTarget = config.projectDir+targetDir,
      indexDir = '/tmp/indexes';

  before(function () {
    mockFs({
      [filePath]: 'Original content',
      [absTarget]: {},
      [indexDir]: {
        '1.pdf': '',
        '2.pdf': '',
        '4.pdf': ''
      }
    });
  });
  it('should move files to project with renaming', function () {
    fM.moveToProject(filePath, targetDir, newName);
    return fs.readFileSync(absTarget+'/'+newName, 'utf8').should.equal('Original content');
  });
  it('should return next index of files in dir', function () {
    fM.getNextIndex(indexDir, '.pdf').should.be.equal(5);
  });
  after(function () {
    mockFs.restore();
  });
});
