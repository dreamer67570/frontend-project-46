import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getRelativePath = (filename) => path.resolve(filename);
const readFile = (filePatch) => fs.readFileSync(getRelativePath(filePatch), 'utf8');

const getFormat = (filePatch) => filePatch.split('.')[1];

export default (filePatch1, filePatch2) => {
  const file1 = readFile(filePatch1);
  const file2 = readFile(filePatch2);

  const obj1 = parse(file1, getFormat(filePatch1));
  const obj2 = parse(file2, getFormat(filePatch1));

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
