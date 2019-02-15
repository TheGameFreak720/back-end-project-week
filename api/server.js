const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const configureAuthRoutes = require('../config/authRoutes');
const configureNoteRoutes = require('../config/noteRoutes.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

// configureAuthRoutes(server);
configureNoteRoutes(server);

module.exports = {
    server,
};