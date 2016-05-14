const PdfManager = require('src/manager/PdfManager/PdfManager'),
      InquirerManager = require('src/manager/InquirerManager/InquirerManager');

class ManualRunner {
  run() {
    const prom = new Promise((resolve) => {
      const pdfManager = new PdfManager('file'),
            inquirerManager = new InquirerManager('manual');

      return Promise
        .all([pdfManager.getPdfs(), inquirerManager.getInquirerResult()])
        .then(([pdfFiles, answers]) => {
          console.log('pdfFiles');
          console.log(pdfFiles);
          console.log('answers');
          console.log(Object.keys(answers));
          resolve();
        });
    });
    return prom;
  }
}

module.exports = ManualRunner;
