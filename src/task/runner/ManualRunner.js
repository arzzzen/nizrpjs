const PdfManager = require('src/manager/PdfManager/PdfManager'),
      InquirerManager = require('src/manager/InquirerManager/InquirerManager'),
      fileManager = require('src/manager/FileManager'),
      config = require('config'),
      genExec = require('src/utils/genExec'),
      KafedraPage = require('src/page/KafedraPage'),
      EbmuMPage = require('src/page/EbmuMPage');

class ManualRunner {
  run() {
    const task = function*() {
      const pdfManager = new PdfManager('file'),
            inquirerManager = new InquirerManager('manual'),
            ebmuMPage = new EbmuMPage();

      let pdfFiles = yield pdfManager.getPdfs();

      for(let pdfFile of pdfFiles) {
          let answers = yield inquirerManager.getInquirerResult(),
              {kafedra, authors, title, type, year} = answers,
              absManualsPath = config.projectDir+kafedra.getManualsUrl(),
              index = fileManager.getNextIndex(absManualsPath, '.pdf'),
              kafedraPage = new KafedraPage(kafedra),
              pdfUrl = kafedra.getManualsUrl()+`/${index}.pdf`,
              manualProps = {authors, title, pdfUrl, type, year};

          fileManager.moveToProject(pdfFile, kafedra.getManualsUrl(), index+'.pdf');
          kafedraPage.addManual(manualProps);
          ebmuMPage.incrementManualsCounter();
      }
    };

    return genExec(task());
  }
}

module.exports = ManualRunner;
