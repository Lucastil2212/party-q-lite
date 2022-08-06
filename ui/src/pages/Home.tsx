import React from "react";
import Dashboard from "./Dashboard";
import Login from ".././components/Login";

const code = new URLSearchParams(window.location.search).get("code");

export default function Home() {
  return code ? <Dashboard code={code} /> : <Login />;
}
