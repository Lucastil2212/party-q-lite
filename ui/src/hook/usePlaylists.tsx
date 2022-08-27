import React, { useState, useContext, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { UserContext } from ".././context/UserContext";

const spotifyApi: any = new SpotifyWebApi({
  clientId: "6a7def7d5c1d4807b9af2b75cc3fce50",
});

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const { user, accessToken } = useContext(UserContext);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [user, accessToken]);

  useEffect(() => {
    spotifyApi
      .getUserPlaylists(user?.id)
      .then((data: any) => {
        setPlaylists(data.body.items);
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setError(e.message);
      });
  }, [accessToken]);
  const createPlaylist = (
    playlistName: string,
    playlistDescription: string
  ) => {
    spotifyApi
      .createPlaylist(user?.id, {
        name: playlistName,
        description: playlistDescription,
        public: true,
      })
      .then((data: any) => {
        console.log("PLAYLIST CREATED");
      })
      .catch((e: any) => {
        console.log("ERROR CREATING PLAYLIST");
      });
  };

  const addTracksToPlaylist = (playlistId: string, tracks: any[]) => {
    spotifyApi
      .addTracksToPlaylist(playlistId, tracks)
      .then((data: any) => {
        console.log("TRACKS ADDED TO PLAYLIST");
      })
      .catch((e: any) => {
        console.log("ERROR ADDING TRACKS TO PLAYLIST");
      });
  };
  return { playlists, createPlaylist, addTracksToPlaylist, isLoading, error };
};
