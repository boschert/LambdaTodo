var io = require('socket.io').listen(80);

io.sockets.one('connection'), function(socket) {
    socket.emit('news', {hello: 'world'});
}