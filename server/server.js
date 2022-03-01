const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/refresh', (req, res)=> {
    const refreshToken = req.body.refreshToken
     const spotifyApi = new SpotifyWebApi({
        redirectUrl: 'http://localhost:3000',
        clientId:'cdace6993b424756957af483bdf47c9f',
        clientSecret:'2b2cc51262354dcda0bb7068b16513b4'
    })

    spotifyApi
        .refreshAccessToken()
        .then((data) => {
            res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
            })
        }).catch(err=>{
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/login', (req, res)=>{
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUrl: 'http://localhost:3000',
        clientId:'cdace6993b424756957af483bdf47c9f',
        clientSecret:'2b2cc51262354dcda0bb7068b16513b4'
    })

    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch(err => {
        res.sendStatus(400)
    })
})

app.listen(3001)