const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = process.env;

async function verifyAccessToken(accessToken) {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  return data;
}

async function generateAccessToken(payload) {
  const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  verifyAccessToken,
  generateAccessToken,
  comparePassword,
  hashPassword,
};
