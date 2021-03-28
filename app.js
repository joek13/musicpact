require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./passport');
const isLoggedIn = require('./middleware/auth');
const MongoClient = require("mongodb").MongoClient;

uri = process.env["DB_URI"]

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const port = 8080;
    const db = client.db("userdb");
    const cookieSession = require('cookie-session');
    const app = express();

    app.use(cookieSession({
        name: 'spotify-auth-session',
        keys: ['key1', 'key2']
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', isLoggedIn, (req, res) => {
        res.send(`Hello world  ${req.user.displayName}`);
    });

    app.get('/logout', (req, res) => {
        req.session = null;
        req.logout();
        res.redirect('/');
    })

    app.use(express.static("public"));

    app.get('/auth/error', (req, res) => res.send('Unknown Error'));

    app.get('/auth/spotify', passport.authenticate('spotify',
        {
            "scope": ["user-top-read", "user-follow-modify"]
        }));

    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', {
            failureRedirect: '/auth/error',
        }),
        (req, res) => { res.redirect('/'); }
    );

    app.listen(port, () => {
        console.log(`Application listening at http://localhost:${port}`)
    });
});
