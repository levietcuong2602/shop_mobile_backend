const router = require('express').Router();
const asyncMiddlware = require('../middlewares/wrapAsync');
const productController = require('../controllers/products');

// const { authenticate, authorize } = require('../middlewares/authenticate');

router.get('/products', asyncMiddlware(productController.gets));
router.get('/products/:productId', asyncMiddlware(productController.getById));
router.get(
  '/products/types/all',
  asyncMiddlware(productController.getProductTypes),
);
router.post('/products', asyncMiddlware(productController.create));
router.put('/products/:productId', asyncMiddlware(productController.update));
router.delete('/products/:productId', asyncMiddlware(productController.remove));

module.exports = router;
