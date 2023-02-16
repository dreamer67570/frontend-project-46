import yaml from 'js-yaml';

export default (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    default: return yaml.load(file);
  }
};
