const validate = require('../middlewares/validate');
const userService = require('../services/users');

async function create(req, res) {
  req
    .checkBody('email')
    .not()
    .isEmpty()
    .withMessage('field email is not emty');
  req
    .checkBody('fullName')
    .not()
    .isEmpty()
    .withMessage('field fullName is not emty');
  req
    .checkBody('passwd')
    .not()
    .isEmpty()
    .withMessage('field passwd is not emty');
  validate.validateParams(req);
  const { email, fullName, passwd } = req.body;
  const results = await userService.create({
    email,
    full_name: fullName,
    passwd,
  });

  return res.send({ status: 1, results });
}

async function login(req, res) {
  req
    .checkBody('email')
    .not()
    .isEmpty()
    .withMessage('field email is not empty');
  req
    .checkBody('passwd')
    .not()
    .isEmpty()
    .withMessage('field passwd is not empty');
  validate.validateParams(req);
  const { email, passwd } = req.body;
  const results = await userService.verifyUser({ email, passwd });
  return res.send({ status: 1, results });
}

async function update(req, res) {}

async function gets(req, res) {
  const results = await userService.findAll();
  return res.send({ status: 1, results });
}

module.exports = {
  create,
  login,
  update,
  gets,
};
