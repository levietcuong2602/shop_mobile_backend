const { Users } = require('../models');
const {
  hashPassword,
  generateAccessToken,
  comparePassword,
} = require('../utils/auth');
const { logger } = require('../utils/logger');
const statusCode = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

async function create(user) {
  const passwd = await hashPassword(user.passwd);
  let userData = await Users.create({ ...user, passwd });
  userData = userData.get({ plain: true });
  const token = await generateAccessToken({
    userId: userData.id,
    email: userData.email,
  });
  return {
    userId: userData.id,
    email: userData.email,
    fullName: userData.full_name,
    token,
  };
}

async function update() {}

async function verifyUser({ email, passwd }) {
  const userData = await Users.findOne({
    where: {
      email,
    },
    // attributes: [
    //   'id',
    //   'full_name',
    //   'email',
    //   'phone_number',
    //   'address',
    //   'passwd',
    // ],
    raw: true,
  });
  const isVerify = await comparePassword(passwd, userData.passwd);
  let token = null;
  if (isVerify) {
    token = await generateAccessToken({
      userId: userData.id,
      email: userData.email,
    });

    return {
      userId: userData.id,
      email: userData.email,
      fullName: userData.full_name,
      token,
      ...userData,
    };
  }

  throw new CustomError(statusCode.UNAUTHORIZED, 'Unauthorized');
}

async function findAll() {
  const users = await Users.findAll({ where: {}, raw: true });
  return users;
}

module.exports = {
  create,
  update,
  verifyUser,
  findAll,
};
