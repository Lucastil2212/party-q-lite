import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Button,
  Modal,
  Typography,
  Box,
  Dialog,
} from "@mui/material";
import axios from "axios";
import { UserContext } from ".././context/UserContext";
import SongSearch from "../components/SongSearch";
import SearchResults from "../components/SearchResults";
import TrackDisplay from "../components/TrackDisplay";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyPlayer from "react-spotify-web-playback";
import CreatePlaylistModal, { Type } from "../components/createPlaylistModal";
import ConfirmCreatePlaylistDialog from "../components/ConfirmCreatePlaylistDialog";

const spotifyApi: any = new SpotifyWebApi({
  clientId: "6a7def7d5c1d4807b9af2b75cc3fce50",
});

export type Track = {
  title?: string;
  artist?: string;
  uri?: string;
};

export default function PartyDashboard({ code }: any) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState<Track>();
  const [userId, setUserId] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [trackHistory, setTrackHistory] = useState<Track[]>([]);

  const [toggleRecents, setToggleRecents] = useState(false);
  const [recents, setRecents] = useState([]);

  const [toggleTops, setToggleTops] = useState(false);
  const [tops, setTops] = useState([]);

  const [seedArtists, setSeedArtists] = useState(["011bJBtG8SdkBqBiSpBllF"]);
  const { accessToken, user } = useContext(UserContext);

  const [recommendations, setRecommendations] = useState(false);

  const [confirmCreatePlaylist, setConfirmCreatePlaylist] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState([]);

  const chooseTrack = (track: any): void => {
    if (track === playingTrack) return;

    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
    setToggleRecents(false);
    setToggleTops(false);
    setSearchResults([]);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    // Get Current User's Recently Played Tracks
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 20,
      })
      .then((data: any) => {
        setRecents(
          data.body.items.map((item: any) => {
            return {
              artist: item.track.artists[0].name,
              title: item.track.name,
              uri: item.track.uri,
              albumUrl: item.track.album.images,
            };
          })
        );
      })
      .catch((err: any) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    // Get Current User's Recently Played Tracks
    spotifyApi
      .getMyTopTracks({
        limit: 20,
        time_range: "short_term",
      })
      .then((res: any) => {
        setTops(
          res.body.items.map((item: any) => {
            return {
              artist: item.artists[0].name,
              title: item.name,
              uri: item.uri,
              albumUrl: item.album.images,
            };
          })
        );
      })
      .catch((err: any) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  useEffect(() => {
    if (!playingTrack) return;

    setRecommendations(false);
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res: any) => {
        setLyrics(res.data.lyrics);
      });

    setTrackHistory(() => [...trackHistory, playingTrack]);
  }, [playingTrack]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    setToggleRecents(false);
    setToggleTops(false);
    setRecommendations(false);

    spotifyApi.searchTracks(search).then((res: any) => {
      setSearchResults(
        res.body.tracks.items.map((track: any) => {
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images,
          };
        })
      );
    });
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    const artists: string[] = [];

    spotifyApi
      .getMyTopArtists({
        limit: 5,
        time_range: "short_term",
      })
      .then((res: any) => {
        console.log(res.body);
        res.body.items.map((artist: any) => {
          artists.push(artist.id);
        });
      })
      .catch((err: any) => {
        console.log("Something went wrong!", err);
      });
    setSeedArtists(artists);
  }, [accessToken]);

  const toggleRecommendations = () => {
    setToggleTops(false);
    setToggleRecents(false);
    setRecommendations(true);
    setSearchResults([]);
    if (!accessToken) return;
    spotifyApi
      .getRecommendations({
        min_energy: 0.4,
        seed_artists: seedArtists,
        min_popularity: 50,
        limit: 20,
      })
      .then((res: any) => {
        setSearchResults(
          res.body.tracks.map((track: any) => {
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images,
            };
          })
        );
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleToggleRecents = () => {
    setToggleTops(false);
    setRecommendations(false);
    setToggleRecents(!toggleRecents);
  };
  const handleToggleTops = () => {
    setToggleRecents(false);
    setRecommendations(false);
    setToggleTops(!toggleTops);
  };

  const onCreatePlaylist = (type: Type) => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    switch (type) {
      case "recents":
        handleCreatePlaylist(recents);
        break;
      case "tops":
        handleCreatePlaylist(tops);
        break;
      case "recomendations":
        console.log("RECOMMENDATIONS");
        break;
      default:
        console.log("CUSTOM");
        break;
    }
    // ("Creating playlist from ");
    // // Create a private playlist
    // spotifyApi
    //   .createPlaylist("My playlist", {
    //     description: "My description",
    //     public: true,
    //   })
    //   .then(
    //     function (data: any) {
    //       console.log("Created playlist!");
    //     },
    //     function (err: any) {
    //       console.log("Something went wrong!", err);
    //     }
    //   );
    // spotifyApi.createPlaylist;
  };

  const handleCreatePlaylist = (arg: any) => {
    setConfirmCreatePlaylist(true);
    setNewPlaylist(arg);
    console.log(arg);
  };

  return (
    <Container>
      <h1>Party Dashboard</h1>
      {/* <CreatePlaylistModal
          toggleRecents={toggleRecents}
          toggleTops={toggleTops}
          toggleRecommendations={recommendations}
          onCreatePlaylist={onCreatePlaylist}
        /> */}
      <div>
        <SongSearch setSearch={setSearch} />
        <Button
          variant={toggleRecents ? "contained" : "outlined"}
          onClick={() => {
            handleToggleRecents();
          }}
        >
          Toggle Recents
        </Button>
        <Button
          variant={toggleTops ? "contained" : "outlined"}
          onClick={() => {
            handleToggleTops();
          }}
        >
          Toggle Tops
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: "1%" }}
          onClick={() => {
            toggleRecommendations();
          }}
        >
          Get Recomendations
        </Button>
      </div>
      <CreatePlaylistModal
        toggleRecents={toggleRecents}
        toggleTops={toggleTops}
        toggleRecommendations={recommendations}
        onCreatePlaylist={onCreatePlaylist}
      />
      <SearchResults
        searchResults={
          toggleRecents ? recents : toggleTops ? tops : searchResults
        }
        chooseTrack={chooseTrack}
      />
      <TrackDisplay playingTrack={playingTrack} />
      <SpotifyPlayer
        autoPlay={playingTrack ? true : false}
        token={accessToken}
        uris={playingTrack && playingTrack.uri ? [playingTrack?.uri] : []}
      />

      <ConfirmCreatePlaylistDialog
        songs={newPlaylist}
        open={confirmCreatePlaylist}
        setOpen={setConfirmCreatePlaylist}
        spotifyApi={spotifyApi}
      ></ConfirmCreatePlaylistDialog>
    </Container>
  );
}
