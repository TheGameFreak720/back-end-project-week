const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const configureRoutes = require('../config/routes.js');

dotenv.config()

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

configureRoutes(server);

module.exports = {
    server,
};