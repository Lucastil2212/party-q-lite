import React, { useState, useEffect, useContext } from "react";
import { Container, Button } from "@mui/material";
import axios from "axios";
import { UserContext } from ".././context/UserContext";
import SongSearch from "../components/SongSearch";
import SearchResults from "../components/SearchResults";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi: any = new SpotifyWebApi({
  clientId: "6a7def7d5c1d4807b9af2b75cc3fce50",
});

export type Track = {
  title?: string;
  artist?: string;
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
  const { accessToken } = useContext(UserContext);

  const chooseTrack = (track: any): void => {
    if (track === playingTrack) return;
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
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
            const smallestAlbumImage = item.track.album.images.reduce(
              (smallest: any, image: any) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              item.track.album.images[0]
            );

            return {
              artist: item.track.artists[0].name,
              title: item.track.name,
              uri: item.track.uri,
              albumUrl: smallestAlbumImage.url,
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
            const smallestAlbumImage = item.album.images.reduce(
              (smallest: any, image: any) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              item.album.images[0]
            );

            return {
              artist: item.artists[0].name,
              title: item.name,
              uri: item.uri,
              albumUrl: smallestAlbumImage.url,
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

    spotifyApi.searchTracks(search).then((res: any) => {
      setSearchResults(
        res.body.tracks.items.map((track: any) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest: any, image: any) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
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
            const smallestAlbumImage = track.album.images.reduce(
              (smallest: any, image: any) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
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
    setToggleRecents(!toggleRecents);
    console.log(tops);
  };
  const handleToggleTops = () => {
    setToggleRecents(false);
    setToggleTops(!toggleTops);
    console.log(tops);
  };

  return (
    <Container>
      <h1>Party Dashboard</h1>
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
          Toggle Recents
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            toggleRecommendations();
          }}
        >
          Toggle Recomendations
        </Button>
      </div>
      <SearchResults
        searchResults={
          toggleRecents ? recents : toggleTops ? tops : searchResults
        }
        chooseTrack={chooseTrack}
      />
    </Container>
  );
}
