import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getRelativePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filePatch) => fs.readFileSync(getRelativePath(filePatch) ?? filePatch, 'utf8');

export default (filePatch1, filePatch2) => {
  const file1 = readFile(filePatch1);
  const file2 = readFile(filePatch2);

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortKeys = _.sortBy(keys);

  let result = '{\n';
  sortKeys.map((key) => {
    if (!_.has(obj1, key)) {
      result += `  + ${key}: ${obj2[key]}\n`;
    } else if (!_.has(obj2, key)) {
      result += `  - ${key}: ${obj1[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      result += `  - ${key}: ${obj1[key]}\n`;
      result += `  + ${key}: ${obj2[key]}\n`;
    } else {
      result += `    ${key}: ${obj1[key]}\n`;
    }
    return 0;
  });

  result += '}';

  return result;
};
