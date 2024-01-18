require('dotenv').config();
const express = require("express");
const corsPolicy = require('cors');
const path = require("path");

const address = process.env.PORT;

const serv = express();
serv.use(corsPolicy());
serv.use(express.json());
serv.use(express.static(path.resolve(__dirname, "static")));

const run = async () => {
    try{
        serv.listen(address);
        console.log(`Running`);
    } catch (e){
        console.log(`Failed. Exception: ${e}`);
    }
}

run();
