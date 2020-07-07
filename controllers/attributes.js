const validate = require('../middlewares/validate');
const attributeService = require('../services/attributes');

async function gets(req, res) {
  req
    .checkQuery('productTypeId')
    .not()
    .isEmpty()
    .withMessage('field product_type_id is not empty');
  req
    .checkQuery('categoryName')
    .not()
    .isEmpty()
    .withMessage('field category_name is not empty');
  validate.validateParams(req);
  const { productTypeId, categoryName } = req.query;
  const results = await attributeService.getAttributes({
    productTypeId,
    categoryName,
  });

  return res.send({ status: 1, results });
}

module.exports = { gets };
