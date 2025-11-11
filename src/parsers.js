import yaml from 'js-yaml'

export default (data, format) => {
  if (format === 'json') {
    return JSON.parse(data)
  }
  // Этот метод принимает строку 
  // в формате YAML (data) и преобразует
  // её в обычный JavaScript-объект.
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data)
  }

  throw Error(`unknow format ${format}`);
}
