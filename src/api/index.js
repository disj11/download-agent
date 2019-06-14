const Router = require('koa-router');

const api = new Router();
const youtubeRouter = require('./youtube');

api.use('/youtube', youtubeRouter.routes());

module.exports = api;