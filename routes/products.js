const router = require('express').Router();
const asyncMiddlware = require('../middlewares/wrapAsync');
const productController = require('../controllers/products');

// const { authenticate, authorize } = require('../middlewares/authenticate');

router.get('/products', asyncMiddlware(productController.gets));
router.get('/products/:productId', asyncMiddlware(productController.getById));
router.post('/products', asyncMiddlware(productController.create));
router.put('/proucts/:productId', asyncMiddlware(productController.update));

module.exports = router;
