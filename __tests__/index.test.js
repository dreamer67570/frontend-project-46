import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check diff flat JSON files', () => {
  const fileName1 = getFixturePath('file1.json');
  const fileName2 = getFixturePath('file2.json');

  expect(genDiff(fileName1, fileName2)).toEqual(readFile('test.txt'));
});

test('check diff flat YAML files', () => {
  const fileName1 = getFixturePath('file1.yml');
  const fileName2 = getFixturePath('file2.yml');

  expect(genDiff(fileName1, fileName2)).toEqual(readFile('test.txt'));
});
