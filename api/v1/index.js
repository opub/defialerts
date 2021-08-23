const router = require('koa-router')();
const alert = require('./alert');

router.use('/alert', alert.routes());

module.exports = router;