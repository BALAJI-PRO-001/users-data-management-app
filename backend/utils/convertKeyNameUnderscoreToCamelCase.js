
function convertKeyNameUnderscoreToCamelCase(obj) {
  const newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      newObj[camelCaseKey] = obj[key];
    }
  }
  return newObj;
}

module.exports = convertKeyNameUnderscoreToCamelCase;