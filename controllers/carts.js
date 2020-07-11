const validate = require('../middlewares/validate');
const cartService = require('../services/carts');

async function getByUser(req, res) {
  const { limit, pageNum, inputSearch } = req.query;
  req
    .checkParams('userId')
    .not()
    .isEmpty()
    .withMessage('field userId is not empty');
  validate.validateParams(req);
  if (limit)
    req
      .checkQuery('limit')
      .isInt()
      .withMessage('field limit is interger');
  if (pageNum)
    req
      .checkQuery('pageNum')
      .isInt()
      .withMessage('field page_num is interger');
  validate.validateParams(req);

  const { userId } = req.params;
  const params = {
    userId,
  };
  if (limit) params.limit = limit;
  if (pageNum) params.pageNum = pageNum;
  if (inputSearch) {
    params.inputSearch = inputSearch;
  }

  const results = await cartService.getByUser(params);
  return res.send({ status: 1, results });
}

async function create(req, res) {
  req
    .checkBody('customerId')
    .not()
    .isEmpty()
    .withMessage('field customer_id is not empty');
  req
    .checkBody('productId')
    .not()
    .isEmpty()
    .withMessage('field product_id is not empty');
  req
    .checkBody('amount')
    .not()
    .isEmpty()
    .withMessage('field amount is not empty')
    .isInt()
    .withMessage('field amount is interger');
  validate.validateParams(req);
  const { customerId, productId, amount } = req.body;
  const results = await cartService.create({ customerId, productId, amount });
  return res.send({ status: 1, results });
}

module.exports = {
  getByUser,
  create,
};
