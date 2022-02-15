const express = require('express');
const https = require('https');
const http = require('http');
const fs = require("fs")
const cors = require('cors');
var bodyParser = require('body-parser')

const port = process.env.PORT || 1999;

// Create app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
    // Create Doc-API
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express")

app.use(cors());
app.use(express.json());


const document = require('./document');
const controller = require('./controller');
const { CheckBlockChains, AddBlockChains } = require('./libs/block_chains');

//#region OPTIONS
const options = {
    definition: document,
    apis: ["./routes/books.js"],
};

const optionsHTTPS = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};
//#endregion


//#region DOC-API
const specs = swaggerJsdoc(options);
app.use(
    "/doc-api",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
//#endregion

//#region CREATE_SERVER
// const server =  https.createServer(optionsHTTPS,app)
const server = http.createServer(app)
    //#endregion

//#region SOCKET IO
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});

//#region API & SOCKET-IO SERVER 
              //    app, io
controller.Controller(app, io)
//#endregion API SERVER


// Block-Chains

// AddBlockChains(11,'Send money','+1000','15','02','2022','17:30:30')


// 

// const { LiveChat } = require("youtube-chat")

// // If channelId is specified, liveId in the current stream is automatically acquired.
// // Recommended
// const liveChat = new LiveChat({channelId: "UCg1JVmII3lBI6-OFeGJEPCw"})

// // Or specify LiveID in Stream manually.
// // const liveChat = new LiveChat({liveId: "syNxntznvPQ"})

// // Emit at start of observation chat.
// // liveId: string
// liveChat.on("start", (liveId) => {
//     /* Your code here! */
//   })
  
//   // Emit at end of observation chat.
//   // reason: string?
//   liveChat.on("end", (reason) => {
//     /* Your code here! */
//   })
  
//   // Emit at receive chat.
//   // chat: ChatItem
//   liveChat.on("chat", (chatItem) => {
//     /* Your code here! */
//   })
  
//   // Emit when an error occurs
//   // err: Error or any
//   liveChat.on("error", (err) => {
//     /* Your code here! */
//   })

// async function LoopLiveChat (){
//     // Start fetch loop
//     while(true){
//         const ok = await liveChat.start()
//         if (!ok) {
//         console.log("Failed to start, check emitted error")
//         }
//     }
// }

// LoopLiveChat()



server.listen(port, () => console.log(`Listening on port ${port}`));







// npm install express nodemon cookie-session passport passport-google-oauth20 — save