const passport = require('passport');
// const api = require('./api');
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
}, (accessToken, refreshToken, profile, done) => {
    var SpotifyWebApi = require('spotify-web-api-node');

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyTopTracks()
        .then(function(data) { 
            let topTracks = data.body.items;
            console.log(topTracks);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    return done(null, profile);
}));