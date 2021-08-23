const router = require('koa-router')();

router.post('/', async (ctx) => {
    // if (!checkServerRequest(ctx)) {
    //     ctx.send(ctx.status, {err: jsonErrors(ctx.errors)})
    //     return
    // }

    // if (!(ctx.request.body.uid && ctx.request.body.pwd && ctx.request.body.name && ctx.request.body.admin && ctx.request.body.email && ctx.request.body.type)){
    //     ctx.send(400, {err: 'bad request'})
    //     return
    // }

    // var group;
    // if (ctx.request.body.gid) {
    //     group = await models.UserGroup.findOne({where: {id:ctx.request.body.gid}});
    // } else{
    //     group = await models.UserGroup.findOne({where: {default:1}});
    // }
    console.log('alert', ctx.request.body);
    ctx.ok(ctx.request.body);
});

module.exports = router;