const router = require('express').Router();
const asyncMiddlware = require('../middlewares/wrapAsync');
const attributeController = require('../controllers/attributes');

router.get('/attributes', asyncMiddlware(attributeController.gets));

module.exports = router;
