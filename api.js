// const axios = require('axios');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken();
spotifyApi.getMyTopTracks()
    .then(function(data) { 
        let topTracks = data.body.items;
        console.log(topTracks);
    }, function(err) {
        console.log('Something went wrong!', err);
    });

exports.get_top_tracks = get_top_tracks;

