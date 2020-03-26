const logger = require('morgan');
const textToSpeech = require('@google-cloud/text-to-speech');
const speech = require('@google-cloud/speech');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const util = require('util');
const fs = require('fs');
const path = require('path');

module.exports = router;
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));
app.use(bodyParser.json());

app.use('/', router);

const client = new textToSpeech.TextToSpeechClient();
const clientsp = new speech.SpeechClient();

wss.on('connection',  function(WebSocket)  {
    //connection is up, let's add a simple simple event
    WebSocket.send('Hello, This message is from Server to Client. Connection Status : Connected!!');
    WebSocket.on('message', async function(text) {
        const request = {
            input: {text: text},
            // Select the language and SSML voice gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            // select the type of audio encoding
            audioConfig: {audioEncoding: 'LINEAR16'},
        };

        const [response] = await client.synthesizeSpeech(request);
        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile('output.mp3', response.audioContent, 'binary');
        console.log('Audio content written to file: output.mp3');
        console.log('App - Relative Path to the file is :', path.resolve('output.mp3'))
        //const filePath = `${path.resolve('output.mp3')}`
        const file = fs.readFileSync(`${path.resolve('output.mp3')}`);
        const audioBytes = file.toString('base64');

        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        const audio = {
            content: audioBytes,
        };
        const config = {
            encoding: 'LINEAR16',
            //sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const req = {
            audio: audio,
            config: config,
        };

        // Detects speech in the audio file
        const [resp] = await  clientsp.recognize(req);
        const transcription = resp.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);
        WebSocket.send(`${transcription}`)
    })

})

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});