### Hexlet tests and linter status:
[![Actions Status](https://github.com/dreamer67570/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/dreamer67570/frontend-project-46/actions)
[![Actions Status](https://github.com/dreamer67570/frontend-project-46/workflows/check/badge.svg)](https://github.com/dreamer67570/frontend-project-46/actions)


## Вычислитель отличий


 Вычислитель отличий – утилита, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

*Возможности утилиты*:

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain, stylish и json


### Пример использования:

```javascript
// формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

// формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}

// формат json
gendiff --format json filepath1.json filepath2.json

{
  "key": "common",
  "diffType": "hasСhildren",
  "children": [
    {
        "key": "follow",
        "value": false,
        "diffType": "added"
    },
  {
      "key": "setting2",
      "value": 200,
      "diffType": "deleted"
  },
  {
      "key": "setting3",
      "value": {
        "before": true,
        "after": null
      },
      "diffType": "changed"
  },
}
```


### Примеры работы утилиты:

**Использования утилиты с плоскими файлами формата json:**
[![asciicast](https://asciinema.org/a/KeYP3xTpsZY3VMjLoYLgPpIjQ.svg)](https://asciinema.org/a/KeYP3xTpsZY3VMjLoYLgPpIjQ)


**Использования утилиты с плоскими файлами формата yml:**
[![asciicast](https://asciinema.org/a/chDyfA0X76kjpAw92r1NCjVFv.svg)](https://asciinema.org/a/chDyfA0X76kjpAw92r1NCjVFv)

**Использования утилиты с вложенными структурами:**
[![asciicast](https://asciinema.org/a/jYhQHdTFXHkGCO8soRhcNoCM1.svg)](https://asciinema.org/a/jYhQHdTFXHkGCO8soRhcNoCM1)


**Генерация отчета в виде plain:**
[![asciicast](https://asciinema.org/a/9ruipuRUByKpfobHDyppQpOeE.svg)](https://asciinema.org/a/9ruipuRUByKpfobHDyppQpOeE)

**Генерация отчета в виде json:**
[![asciicast](https://asciinema.org/a/iQgsQ10WpTUcGH5S422YUm1HO.svg)](https://asciinema.org/a/iQgsQ10WpTUcGH5S422YUm1HO)