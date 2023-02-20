import stylish from './stylish.js';
import plain from './plain.js';

const mapFormatter = {
  stylish,
  plain,
};

export default (data, nameFormater) => {
  const formatter = mapFormatter[nameFormater];
  return formatter(data);
};
