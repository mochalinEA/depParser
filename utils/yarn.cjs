// этот костыль добавлен, потому что lockfile при подключении через ESM работает некорректно
const lockfile = require('@yarnpkg/lockfile');

function parse(textFile) {
  return lockfile.parse(textFile)
}

module.exports = {
  parse
}
