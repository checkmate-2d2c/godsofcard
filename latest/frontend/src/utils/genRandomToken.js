import crypto from 'crypto';

const genRandomToken = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

export default genRandomToken;