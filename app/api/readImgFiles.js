/**
 * Created by Lightstaff on 2016/09/22.
 */

const fs = require('fs');
const path = require('path');

const readImgFiles = (folder) => new Promise((resolve, reject) => {
  fs.readdir(folder, (err, files) => {
    if (err) {
      return reject(err);
    }

    const filteredFiles = files.filter(item => path.extname(item) === '.jpg' || path.extname(item) === '.png');

    const results = [];
    filteredFiles.forEach((file) => {
      results.push({
        path: path.join(folder, file),
        fileName: file,
      });
    });

    return resolve(results);
  });
});

export default readImgFiles;
