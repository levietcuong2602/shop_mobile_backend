const router = require('express').Router();
const asyncMiddlware = require('../middlewares/wrapAsync');
const providerController = require('../controllers/providers');

router.get('/providers/products-type', asyncMiddlware(providerController.gets));

module.exports = router;
