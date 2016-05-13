const PdfManager = require('src/manager/PdfManager/PdfManager'),
      pdfManager = new PdfManager();

pdfManager.getPdfs().then(files => console.log(files))