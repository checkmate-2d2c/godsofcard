import crypto from 'crypto';

function genRandomToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

export default genRandomToken;