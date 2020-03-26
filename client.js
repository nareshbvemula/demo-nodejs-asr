const WebSocket = require('ws');
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
const util = require('util');



connection.onopen = () => {
    connection.send('Good for you')
}

connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (message) => {
    console.log("Received Message: ", message.data)
}

connection.close = () => {
    console.log("Disconnected")
}