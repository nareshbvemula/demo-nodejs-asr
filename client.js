const WebSocket = require('ws');
const url = 'ws://localhost:8999'
const connection = new WebSocket(url)
connection.onopen = () => {
    connection.send('hey')
}

connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (message) => {
    console.log("Received Message: ", message)
}
connection.close = () => {
    console.log("Disconnected")
}