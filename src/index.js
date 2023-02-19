import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import stylish from './stylish.js';

const getRelativePath = (filename) => path.resolve(filename);
const readFile = (filePatch) => fs.readFileSync(getRelativePath(filePatch), 'utf8');

const getFormat = (filePatch) => filePatch.split('.')[1];

export default (filePatch1, filePatch2) => {
  const file1 = readFile(filePatch1);
  const file2 = readFile(filePatch2);

  const obj1 = parse(file1, getFormat(filePatch1));
  const obj2 = parse(file2, getFormat(filePatch1));

  const treeDiff = buildTree(obj1, obj2);
  return stylish(treeDiff);
};
