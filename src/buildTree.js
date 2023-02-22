import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = _.sortBy(keys).map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], diffType: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], diffType: 'deleted' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, diffType: 'hasСhildren', children: buildTree(obj1[key], obj2[key]) };
    }

    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], diffType: 'unchanged' };
    }

    return { key, value: { before: obj1[key], after: obj2[key] }, diffType: 'changed' };
  });
  return diff;
};
export default buildTree;
