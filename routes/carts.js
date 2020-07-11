const router = require('express').Router();
const asyncMiddlware = require('../middlewares/wrapAsync');
const cartController = require('../controllers/carts');

router.get('/carts/users/:userId', asyncMiddlware(cartController.getByUser));
router.post('/carts', asyncMiddlware(cartController.create));

module.exports = router;
