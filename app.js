const koa = require('koa');
const logger = require('koa-logger');
const respond = require('koa-respond');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static-server');

const api = require('./api/v1');
const router = require('koa-router')();

const PORT = 3000;

const app = module.exports = new koa();

// middleware
app.use(logger());
app.use(respond());
app.use(bodyParser({
    onerror: function (err, ctx) {
        ctx.throw(422, 'body parse error:' + err.toString());
    },
}));

// routes
app.use(serve({ rootDir: 'static' }));
router.use('/api/v1', api.routes());

app.use(router.routes());

if (!module.parent) {
    console.log('listening on', PORT);
    app.listen(PORT);
}