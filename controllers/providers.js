const providerService = require('../services/providers');
const validate = require('../middlewares/validate');

async function gets(req, res) {
  req
    .checkQuery('productTypeId')
    .not()
    .isEmpty()
    .withMessage('field product_type is not empty');
  validate.validateParams(req);
  const { productTypeId } = req.query;
  const results = await providerService.gets(productTypeId);
  return res.send({ status: 1, results });
}

module.exports = { gets };
