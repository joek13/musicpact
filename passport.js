const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/spotify/callback"
}, (accessToken, refreshToken, profile, done) => done(null, profile)));