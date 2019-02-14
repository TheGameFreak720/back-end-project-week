const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const configureRoutes = require('../config/routes.js');

dotenv.config()

const server = express();

//Configuring Express Session
const sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if(server.get('env') === 'production') {
    sess.cookie.secure = true;
}

//Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID.
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(session(sess));
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
});

configureRoutes(server);

module.exports = {
    server,
};