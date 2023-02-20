import _ from 'lodash';

const normalize = (value) => {
  if (!_.isObject(value)) {
    const type = typeof value;
    if (value === null) {
      return value;
    }
    return (type !== 'boolean') ? `'${value}'` : value;
  }
  return '[complex value]';
};

export default (data) => {
  const iter = (tree, patch) => {
    const lines = tree.flatMap((element) => {
      const { key, diffType } = element;
      if (diffType !== 'hasСhildren') {
        const { value } = element;
        const newValue = normalize(value);
        const newKey = (patch.length !== 0) ? `${patch.join('.')}.${key}` : key;
        switch (diffType) {
          case 'added': {
            return `Property '${newKey}' was added with value: ${newValue}`;
          }
          case 'deleted': {
            return `Property '${newKey}' was removed`;
          }
          case 'unchanged': return [];
          default: {
            return `Property '${newKey}' was updated. From ${normalize(value.before)} to ${normalize(value.after)}`;
          }
        }
      }
      const { children } = element;
      patch.push(key);
      return iter(children, patch);
    });
    patch.pop();
    return lines.join('\n');
  };
  return iter(data, []);
};
