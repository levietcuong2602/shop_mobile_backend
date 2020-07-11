const validate = require('../middlewares/validate');
const productService = require('../services/products');

async function gets(req, res) {
  const {
    limit,
    pageNum,
    inputSearch,
    productType,
    providerId,
    storageValue,
    order,
  } = req.query;
  let { startTime, endTime } = req.query;

  req
    .checkQuery('limit')
    .not()
    .isEmpty()
    .withMessage('field limit is not empty')
    .isInt()
    .withMessage('field limit is interger');
  req
    .checkQuery('pageNum')
    .not()
    .isEmpty()
    .withMessage('field page_num is not empty')
    .isInt()
    .withMessage('field page_num is interger');
  if (startTime)
    req
      .checkQuery('startTime')
      .isInt()
      .withMessage('field start_time invalid')
      .isLength({
        min: 1,
        max: 13,
      })
      .withMessage('field start_time is timestamp');
  if (startTime)
    req
      .checkQuery('endTime')
      .isInt()
      .withMessage('field end_time invalid')
      .isLength({
        min: 1,
        max: 13,
      })
      .withMessage('field end_time is timestamp');
  if (startTime && endTime) {
    req
      .checkQuery('startTime')
      .custom(value => {
        return value - req.query.endTime <= 0;
      })
      .withMessage('field startTime <= endTime');
  }
  validate.validateParams(req);

  if (!startTime) startTime = 1;
  if (!endTime) endTime = new Date().valueOf();

  startTime = parseFloat(startTime);
  endTime = parseFloat(endTime);

  const params = {
    limit,
    pageNum,
    startTime,
    endTime,
  };
  if (inputSearch) {
    params.inputSearch = inputSearch;
  }
  if (productType) {
    params.productType = productType;
  }
  if (providerId) {
    params.providerId = providerId;
  }
  if (storageValue) {
    params.storageValue = storageValue;
  }
  if (order) {
    params.order = order
      .trim()
      .split('|')
      .map(item => item.split(','));
  }

  const results = await productService.gets(params);
  return res.send({ status: 1, results });
}

async function getById(req, res) {
  req
    .checkParams('productId')
    .not()
    .isEmpty()
    .withMessage('field chapter_id is not empty');
  validate.validateParams(req);
  const { productId } = req.params;
  const results = await productService.findById(productId);

  return res.send({ status: 1, results });
}

async function getProductTypes(req, res) {
  const results = await productService.getProductTypes();

  return res.send({ status: 1, results });
}

async function update(req, res) {
  return res.send({ status: 1 });
}

async function remove(req, res) {
  req
    .checkParams('productId')
    .not()
    .isEmpty()
    .withMessage('field product_id is not empty');
  validate.validateParams(req);
  const { productId } = req.params;
  const results = await productService.remove(productId);

  return res.send({ status: 1, results });
}

async function create(req, res) {
  return res.send({ status: 1 });
}

module.exports = {
  gets,
  update,
  remove,
  create,
  getById,
  getProductTypes,
};
