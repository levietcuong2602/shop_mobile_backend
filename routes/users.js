const router = require('express').Router();
const asyncMiddlware = require('../middlewares/wrapAsync');
const userController = require('../controllers/users');

// const { authenticate, authorize } = require('../middlewares/authenticate');

router.get('/users', asyncMiddlware(userController.gets));
router.post('/users', asyncMiddlware(userController.create));
router.put('/users/:userId', asyncMiddlware(userController.update));
router.post('/users/login', asyncMiddlware(userController.login));

module.exports = router;
