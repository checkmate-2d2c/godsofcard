import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-defaults';

dotenv.config();

function encryptToken(plainData) {
  const cipherToken = jwt.sign(
    plainData,
    process.env.JWT_SECRET_KEY, 
    { expiresIn: '14d' }
  );
  return cipherToken;
}

function decryptToken(cipherToken) {
  let plainData = null;
  jwt.verify(
    cipherToken,
    process.env.JWT_SECRET_KEY,
    (err, payload) => {
      plainData = err ? null : payload;
    }
  );
  return plainData;
}

export { encryptToken, decryptToken };