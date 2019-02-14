const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const configureRoutes = require('../config/routes.js');

dotenv.config()

const server = express();

const sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if(server.get('env') === 'production') {
    sess.cookie.secure = true;
}

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(session(sess));

configureRoutes(server);

module.exports = {
    server,
};