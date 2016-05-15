'use strict';

const chai = require('chai'),
      chaiAsPromised = require('chai-as-promised'),
      kafedrasCollection = require('src/collection/KafedrasCollection'),
      mockFs = require('mock-fs'),
      fs = require('fs'),
      config = require('config'),
      AbstractPage = require('src/page/AbstractPage'),
      KafedraPage = require('src/page/KafedraPage'),
      EbmuMPage = require('src/page/EbmuMPage');

chai.use(chaiAsPromised);
chai.should();

describe('Abstract page', function () {
  var kP;

  before(function () {
    var kafedra = kafedrasCollection.first(),
        kafedraFilePath = config.projectDir+kafedra.getUrl(),
        mockHtml = '<html><body class="test-class"></body></html>';

    mockFs({
      [kafedraFilePath]: mockHtml
    });

    kP = new KafedraPage(kafedra);
  });

  it('should set cherio object with page content', function () {
    kP.$('body').attr('class').should.be.equal('test-class');
  });

  it('should save cherion html to page file', function () {
    kP.$('body').html('Test text');
    kP.save();
    fs.readFileSync(kP.file, {encoding: 'utf-8'})
      .should.be.equal('<html><body class="test-class">Test text</body></html>');
  });

  after(function() {
    mockFs.restore();
  });
});

describe('Kafedra page', function () {
  var kP;
  before(function () {
    var kafedra = kafedrasCollection.first(),
        kafedraFilePath = config.projectDir+kafedra.getUrl(),
        mockHtml = '<ol><li>example</li></ol>';

    mockFs({
      [kafedraFilePath]: mockHtml
    });

    kP = new KafedraPage(kafedra);
  });
  it('should be an instance of AbstractPage', function () {
    kP.should.be.an.instanceOf(AbstractPage);
  });
  it('should add manual to kafedra page', function () {
    let manualProps = {
        authors: 'Авторы',
        title: 'Название',
        pdfUrl: '1.pdf',
        type: 'Методичка',
        year: '2016'
      };

    kP.addManual(manualProps);
    fs.readFileSync(kP.file, {encoding: 'utf-8'})
      .should.be.equal('<ol><li>Авторы <b>Название.</b> <a href="1.pdf">Методичка</a> 2016г. (PDF)</li><li>example</li></ol>');
  });

  after(function() {
    mockFs.restore();
  });
});


describe('Ebmu_m page', function () {
  var ebP,
      ebmuMFile = config.projectDir+'/ebmu_m.htm';
  before(function () {
    let mockHtml = '<div><span class="manualsCounter">345</span></div>';
    mockFs({
      [ebmuMFile]: mockHtml
    });
    ebP = new EbmuMPage();
  });
  it('should be an instance of AbstractPage', function () {
    ebP.should.be.an.instanceOf(AbstractPage);
  });
  it('should increment manuals counter', function () {
    ebP.incrementManualsCounter();
    let fileContent = fs.readFileSync(ebmuMFile);
    /346/.test(fileContent).should.be.true;
  });
  after(function() {
    mockFs.restore();
  });
});
