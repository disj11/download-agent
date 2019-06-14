exports.view = ctx => {
    const {id} = ctx.params;
    ctx.body = `view id : ${id}`;
};

exports.list = ctx => {
    ctx.body = 'list';
};

exports.download = ctx => {
    const {id} = ctx.params;
    ctx.body = `download id ${id}`;
};