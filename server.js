const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

console.log('started on 3000 port');
app.listen(3000);