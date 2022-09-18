This repository was made by EUA students  to use with web and kotlin chat clients
# EUA CHAT SERVER
This repo contains SocketIO websocket server, express server and web client for testing, debugging and kidding purposes. 
![](https://github.com/alkhachatryan/eua-chat-server/blob/master/screenshot.png)

Use **https://eua-chat.herokuapp.com/** as websocket server host
When connecting to the server there will be automatically emitted **connection** event.
When disconnected, **disconnect** event will be emitted automatically.

### Available events to emit from client
1. **chatMessage** - emit this event and set the text when sending a message to the server.

### Available events to listen on client side
1. **updateUsersList** - the server will emit this to share with clients the list of the connected clients.
   Example: `{
   "ODIY6X": "John Smith",
   "DYN3HT": "Raul Gonzales", 
   }` 
2. **userConnected** - the server will update all clients about new connected user. Example: `{id: "ODIY6X", nickname: "John Smith"}`
3. **userDisconnected** - the server will update all clients about disconnected user. Example: `{id: "ODIY6X", nickname: "John Smith"}`
4. **chatMessage** - the server will emit a new event to all clients (including a client which sent the message) for a new chat message.
    Data example: `{
   from: {
     id: "ODIY6X",
     name: "John Smith"
   },
   message: "Hello World"
   }` 
