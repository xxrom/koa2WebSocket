const koa = require('koa');
const http = require('http');

const app = new koa();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = require('socket.io')(server);

// our localhost port
const port = 4001;
let currentColor = 'white'; // color for everyone

// This is what the socket.io syntax is like, we will work this later
io.on('connection', (socket) => {
  console.log('User connected');

  const toggleColor = color => (color === 'white' ? 'red' : 'white');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('toggle color auto', () => {
    // получаем name и function, в которую передадим данные currentColor
    console.log('toggle color auto');

    console.log(currentColor);
    currentColor = toggleColor(currentColor);
    console.log(currentColor);

    io.sockets.emit('toggle color auto', currentColor);
  });

  socket.on('onPlayYouTube', () => {
    console.log('onPlayYouTube');
    io.sockets.emit('onPlayYouTube');
  });

  socket.on('onPauseYouTube', () => {
    console.log('onPauseYouTube');
    io.sockets.emit('onPauseYouTube');
  });

  socket.on('youtubeEvent', (data, time) => {
    console.log('youtubeEvent');
    console.log(data);
    console.log(time);
    switch (data) {
      case 1:
        io.sockets.emit('youtubeStart');
        break;

      case 2:
        io.sockets.emit('youtubePause');
        break;

      default:
        break;
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
