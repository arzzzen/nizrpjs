'use strict';

const chai = require('chai'),
      mockFs = require('mock-fs'),
      config = require('config'),
      _ = require('lodash'),
      chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const PdfManager = require('src/manager/PdfManager/PdfManager'),
      pdfsPath = config.pdfsPath,
      pdfFiles = [
        'babDusya.pdf',
        'kloun.pdf',
        'война и мир.pdf'
        ];

describe('PdfManager', function() {
  var pdfManager;

  before(function() {
    mockFs({
      [pdfsPath]: _.zipObject(pdfFiles, pdfFiles)
    });
    pdfManager = new PdfManager('file');
  });

  it('should be instance of PdfManager', function() {
    pdfManager.should.be.an.instanceOf(PdfManager);
  });

  describe('getPdfs method', function() {
    it('should return Promise', function() {
      pdfManager.getPdfs().should.be.an.instanceOf(Promise);
    });
    it('should be resolved with Array', function() {
      return pdfManager.getPdfs().should.eventually.be.an.instanceOf(Array);
    });
  });

  describe('as file storage', function() {

    it('should return pdf files from config folder', function() {
      var pdfFullPath = _.map(pdfFiles, (pdfFile) => config.pdfsPath+pdfFile);
      return pdfManager.getPdfs().should.eventually.to.deep.equal(pdfFullPath);
    });
  });

  after(function() {
    mockFs.restore();
  });
});
