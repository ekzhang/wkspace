import crypto from 'crypto';
import { promisify } from 'util';

const randomBytesAsync = promisify(crypto.randomBytes);

export async function randomId(size = 6) {
  const buf = await randomBytesAsync(size);
  return buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
}
