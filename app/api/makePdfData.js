/**
 * Created by Lightstaff on 2016/09/27.
 */

import pdfjsLib from 'pdfjs-dist';

const fs = require('fs');

pdfjsLib.PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');

const makePdfData = (path) => new Promise((resolve, reject) => {
  try {
    const fileData = fs.readFileSync(path);
    const dataArray = new Uint8Array(fileData);
    pdfjsLib.getDocument(dataArray).then(pdfDocument => {
      return resolve(pdfDocument);
    })
  } catch(err) {
    return reject(err);
  }
});

export default makePdfData;
