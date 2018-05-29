// const Koa = require('koa');
// const app = new Koa();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// console.log('started on 3000 port');
// app.listen(3000);

const koa = require('koa');
const http = require('http');

const app = new koa();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = require('socket.io')(server);

// our localhost port
const port = 4001;

// This is what the socket.io syntax is like, we will work this later
io.on('connection', (socket) => {
  console.log('User connected');
  let currentColor = 'white';

  const toggleColor = color => (color === 'white' ? 'red' : 'white');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('toggle color', (name, fn) => {
    // получаем name и function, в которую передадим данные currentColor
    console.log('enter ferret socket.on');
    console.log(`${name}`);

    console.log(`currentColor ${currentColor}`);
    currentColor = toggleColor(currentColor);
    console.log(`currentColor ${currentColor}`);
    fn(currentColor);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
