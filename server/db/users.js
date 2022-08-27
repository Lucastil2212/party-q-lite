import { db } from "./db.js";

// export type NewUser = {
//   spotifyId: string,
//   name: string,
// };

export function createUser(user) {
  try {
    db("user").insert([{ spotifyId: user.spotifyId, name: user.name }]);
  } catch (e) {
    console.log("Error creating user", e);
  }
}

export function getSongList(id) {
  try {
    db("user")
      .where({ spotifyId: id })
      .then((user) => {
        return user.songList;
      });
  } catch (e) {
    console.log("Error getting song list from user with id: " + id, e);
  }
}
