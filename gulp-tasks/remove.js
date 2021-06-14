var del = require('del');

function remove(path, stats) {
  console.log(`File ${path} was removed`)
}

exports.default = remove
