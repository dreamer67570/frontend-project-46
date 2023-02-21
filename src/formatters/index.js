import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (data, nameFormater) => {
  switch (nameFormater) {
    case 'stylish': {
      return stylish(data);
    }
    case 'plain': {
      return plain(data);
    }
    case 'json': {
      return json(data);
    }
    default: return `Unknown order state: '${nameFormater}'!`;
  }
};
