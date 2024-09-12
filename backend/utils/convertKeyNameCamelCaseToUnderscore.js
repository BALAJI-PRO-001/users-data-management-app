
function convertKeyNameCamelCaseToUnderscore(obj) {
  const newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const underscoreKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      newObj[underscoreKey] = obj[key];
    }
  }
  return newObj;
}

module.exports = convertKeyNameCamelCaseToUnderscore;