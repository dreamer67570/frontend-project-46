import _ from 'lodash';

export const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const nextLevel = 4;
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize + nextLevel);
    const bracketIndent = replacer.repeat(indentSize);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const mapDiff = {
  added: '+ ', // ключ отсутствовал в первом объекте, но был добавлен во второй
  deleted: '- ', // ключ был в первом объекте, но отсутствует во втором
  unchanged: '  ', // ключ присутствовал и в первом и во втором объектах с одинаковыми значениями
  hasСhildren: '  ',
};

export default (data) => {
  const iter = (currentValue, depth) => {
    const specSymbolSize = 2;
    const spacesCount = 4;
    const currentIndent = ' '.repeat(spacesCount * depth - specSymbolSize);
    const bracketIndent = ' '.repeat(depth * spacesCount - spacesCount);

    const lines = currentValue.map((element) => {
      const { key, diffType } = element;
      if (_.has(element, 'children')) {
        const { children } = element;
        return `${currentIndent}${mapDiff[diffType]}${key}: ${iter(children, depth + 1)}`;
      }
      if (element.diffType === 'changed') {
        const { value } = element;
        const del = `${currentIndent}${mapDiff.deleted}${key}: ${stringify(value.before, ' ', spacesCount * depth)}\n`;
        const add = `${currentIndent}${mapDiff.added}${key}: ${stringify(value.after, ' ', spacesCount * depth)}`;
        return del + add;
      }
      const { value } = element;
      return `${currentIndent}${mapDiff[diffType]}${key}: ${stringify(value, ' ', spacesCount * depth)}`;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};
