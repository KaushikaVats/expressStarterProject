///basic server configuration
const express = require('express');
const serverCongig = require('./config/serverConfig');

const PORT = process.env.PORT;

const app = express();

app.listen(serverCongig.PORT , ()=>{
    console.log(`Server started at port ${serverCongig.PORT}`);
   
})