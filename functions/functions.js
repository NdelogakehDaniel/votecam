const { createHash } = require('crypto');

exports.hash = function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}