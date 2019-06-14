const Router = require('koa-router');

const router = new Router();
const ctrl = require('./youtube.controller');

router.get('/', ctrl.list);
router.get('/:id', ctrl.view);
router.get('/download/:id', ctrl.download);

module.exports = router;