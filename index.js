require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routers/routes')
require('./database/dbConnection')

const cabbonServer = express()
cabbonServer.use(cors({
    origin: 'http://localhost:5173', // allow frontend dev server
    credentials: true
  }));
cabbonServer.use(express.json())
cabbonServer.use(router)

const PORT = 3000 || process.env.PORT

cabbonServer.listen(PORT,()=>{
    console.log(`server running in port : ${PORT} and waiting for client request`);
})

cabbonServer.get('/test', (req, res) => {
    res.json({ message: 'CORS test successful' });
});

cabbonServer.get("/", (req, res) => {
    res.status(200).send("<h3>Server running and waiting for client requests</h3>");
  });

