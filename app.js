require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./passport');
const nconf = require('nconf');
const MongoClient = require("mongodb").MongoClient;

nconf.argv()
    .env()
    .file("config.json");

uri = nconf.get("DB_URI");

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const db = client.db("userdb");
    const cookieSession = require('cookie-session');
    const app = express();

    const port = 8080;

    app.use(cookieSession({
        name: 'spotify-auth-session',
        keys: ['key1', 'key2']
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static("public"));

    app.get('/', (req, res) => {
        res.send(`Hello world  ${req.user.displayName}`);
    });

    app.get('/auth/error', (req, res) => res.send('Unknown Error'));

    app.get('/auth/spotify', passport.authenticate('spotify'));

    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
        (req, res) => { res.redirect('/'); }
    );

    app.listen(port, () => {
        console.log(`Application listening at http://localhost:${port}`)
    });
});
