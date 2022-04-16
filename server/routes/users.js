const router = require('express').Router();
const controller = require('./../controllers');

// GET /items Router와 Controller를 연결합니다.
router.get('/:userId/orders', controller.orders.get);
router.post('/:userId/orders', controller.orders.post);

module.exports = router;