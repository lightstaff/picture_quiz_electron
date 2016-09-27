/**
 * Created by Lightstaff on 2016/09/22.
 */

const fs = require('fs');
const path = require('path');

const readLocalFiles = ({ folder, queryExt }) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if (err) {
        return reject(err);
      }

      let filteredFiles = files;
      if (queryExt) {
        filteredFiles = files.filter(item => path.extname(item) === queryExt);
      }

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
};

export default readLocalFiles;
