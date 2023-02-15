import yaml from 'js-yaml';

export default (file, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(file);

    default: return JSON.parse(file);
  }
};
