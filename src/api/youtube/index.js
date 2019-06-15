const Router = require('koa-router');

const router = new Router();
const ctrl = require('./youtube.controller');

router.get('/download/:id', ctrl.download);
router.get('/play/:id', ctrl.play);

module.exports = router;