const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server)

const HOST = process.env.APP_URL || 'http://localhost';
const PORT = process.env.PORT || 3000;

io.chatClients = {};
io.emitAll = (eventName, data) => {
    Object.keys(io.chatClients).forEach((id) => {
        io.to(id).emit(eventName, data)
    })
}

app.get('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, './view/index.html'), (err, data) => {
        if(err) throw err;
        let html = data.toString();
        html = html.replace('[[WEBSOCKET_HOST]]', `${HOST}:${PORT}`)
        res.status(200).send(html)
    })
})

io.on('connection', (socket) => {
    const nickname = socket.handshake.query.nickname;
    const id = socket.id;
    io.chatClients[id] = nickname;
    io.emitAll('updateUsersList', io.chatClients)
    io.emitAll('userConnected', {id, nickname})

    socket
        .on('disconnect', () => {
            delete io.chatClients[socket.id]
            io.emitAll('updateUsersList', io.chatClients)
            io.emitAll('userDisconnected', {id, nickname})
        })
        .on('chatMessage', (message) => {
            io.emitAll('chatMessage', {
                from: {
                    id: socket.id,
                    name: io.chatClients[socket.id]
                },
                message
            })
        })
    ;
});

server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
});
