const crypto = require('crypto');
const { promisify } = require('util');
const randomBytesAsync = promisify(crypto.randomBytes);

async function randomId(size = 6) {
  const buf = await randomBytesAsync(size);
  return buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
}

module.exports = { randomId };
