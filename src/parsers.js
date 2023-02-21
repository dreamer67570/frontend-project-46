import yaml from 'js-yaml';

export default (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default: return `Unknown order state: '${format}'!`;
  }
};
