const mongoose = require('mongoose')
const serverConfig = require('./serverConfig');

async function connectDB(){
    try{
         await mongoose.connect(serverConfig.DB_URL);
         console.log("Successfully connected to the mongoDB server..");
    }catch(error){
       console.log("could not connect to the server ");
       console.log(error);
    }
}

module.exports = connectDB;