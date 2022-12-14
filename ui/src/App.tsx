import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Home from "./pages/Home";
import PartyDashboard from "./pages/PartyDashboard";
import { UserContext } from "./context/UserContext";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [accessToken, setToken] = useState("");
  const setAccessToken = (value: string) => {
    setToken(value);
  };

  const userContext = useContext(UserContext);

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard code={code} />} />
          <Route path="/party" element={<PartyDashboard code={code} />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
