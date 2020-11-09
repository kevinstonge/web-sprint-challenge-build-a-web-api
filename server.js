const express = require('express');
const server = express();
const cors = require('cors');
server.use(express.json());
server.use(cors());

const projectRouter = require("./api/projectRouter");
const actionRouter = require("./api/actionRouter");
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
server.get('/',(req,res)=>{res.status(200).json({message: "server online", MOTD: process.env.MOTD || "default motd"})})

module.exports = server;