import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import lyricsFinder from "lyrics-finder";
import SpotifyWebApi from "spotify-web-api-node";

const REDIRECT_URI = "http://localhost:3000/dashboard";
const CLIENT_ID = "6a7def7d5c1d4807b9af2b75cc3fce50";
const CLIENT_SECRET = "9a8f31089fdc45f08f235401ed574010";

// initialize express app and start middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// request handlers
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get("/features", (req, res) => {
  const track = req.query.track;
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi
    .getAudioAnalysisForTrack(track)
    .then((data) => {
      res.json({
        features: data.body.audio_features,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

app.listen(3001);
