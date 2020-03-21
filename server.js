const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', function(WebSocket)  {

    //connection is up, let's add a simple simple event
    WebSocket.on('message', function(message)  {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        WebSocket.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    WebSocket.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});