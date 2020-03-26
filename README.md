# demo-nodejs-asr
This is a sample NodeJs Project with wesckets to demonstrate google Test to Speech and Speech to Test.

# Content
app.js - NodejS Application which will start an http server on port 8080 and exposes as a websocket
client.js - used to test the server by sending test messages

# How to build and start the server
Clone this repository to the machine where you would like to build
```bash
$ git clone https://github.com/nareshbvemula/demo-nodejs-asr.git
cd demo-nodejs-asr
```
1. Setup a google Project (One time Task)
Follow the procedure in the link and setup a google project and update the credentials to path Variable "GOOGLE_APPLICATION_CREDENTIALS" 
https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries
2. Start the server
```bash
$ node app.js
```
3. Test with Client
```bash
$ node client.js
```
# How this works?
1. Server will start listerning to the clients on port 8080
2. When you start the client, it will connect to the server and send's a test message to the server.
3. On Server: 
    1). When it receives a "Test Message", it will convert the test to Speech by connecting to Google API's and write an audio file to         the local system.
    2) Then again this Sppech or Voice is Converted to Text by connecting to Google API's, and then the translated text is send to            client


