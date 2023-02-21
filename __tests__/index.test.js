import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { stringify } from '../src/formatters/stylish.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check diff JSON files', () => {
  const fileName1 = getFixturePath('file1.json');
  const fileName2 = getFixturePath('file2.json');
  const formatter1 = 'stylish';
  const formatter2 = 'plain';

  expect(genDiff(fileName1, fileName2, formatter1)).toEqual(readFile('testStylish.txt'));
  expect(genDiff(fileName1, fileName2, formatter2)).toEqual(readFile('testPlain.txt'));
});

test('check diff YAML files', () => {
  const fileName1 = getFixturePath('file1.yml');
  const fileName2 = getFixturePath('file2.yml');
  const formatter1 = 'stylish';
  const formatter2 = 'plain';

  expect(genDiff(fileName1, fileName2, formatter1)).toEqual(readFile('testStylish.txt'));
  expect(genDiff(fileName1, fileName2, formatter2)).toEqual(readFile('testPlain.txt'));
});

test('check formatter json', () => {
  const fileName1 = getFixturePath('file3.json');
  const fileName2 = getFixturePath('file4.json');
  const formatter1 = 'json';

  expect(genDiff(fileName1, fileName2, formatter1)).toEqual(readFile('testJSON.txt'));
});

test('check parse formatters', () => {
  const fileName1 = getFixturePath('file3.json');
  const fileName2 = getFixturePath('file4.json');
  const formatter = 'string';

  expect(genDiff(fileName1, fileName2, formatter)).toBe(`Unknown order state: '${formatter}'!`);
});

test('check parse format', () => {
  const fileName = 'file.txt';
  const format = fileName.split('.')[1];

  expect(parsers(fileName, format)).toBe(`Unknown order format: '${format}'!`);
});

test('stringify', () => {
  const fileName1 = readFile('file1.json');
  expect(stringify(fileName1)).toEqual(readFile('testStringify.txt'));
});
