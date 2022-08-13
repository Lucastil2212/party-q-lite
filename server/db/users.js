const db = require("./db/db.js");

export function createUser() {
  db("user").insert([]);
}
