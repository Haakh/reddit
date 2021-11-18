import { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Route, Routes, useLocation } from "react-router-dom";
import base64 from "base-64";

import "./App.css";

const CLIENT_ID = "H8N2D7NedGKuZf_LrdSNIg";
const CLIENT_SECRET = "Vf4cS6GjJR6l-gR5d_h0wiSaLNCkRw";
const randomNumber = "newscopetokenid";
const redirectUri = "http://localhost:3000";

function App() {
  const [count, setCount] = useState(0);
  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const authState = query.get("state");
  const authCode = query.get("code") || "";

  useEffect(() => {
    const getToken = async () => {
      const body = new URLSearchParams();
      body.append("grant_type", "authorization_code");
      body.append("code", authCode);
      body.append("redirect_uri", redirectUri);

      const options = {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        },
        body,
      };

      const response = await fetch(
        "https://www.reddit.com/api/v1/access_token",
        options
      );

      console.log("response", response);
    };

    if (authCode) {
      getToken();
    }
  }, [authCode]);

  const signIn = async () => {
    const url = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${randomNumber}&redirect_uri=${redirectUri}&duration=permanent&scope=*`;

    window.open(url, "_self");
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
          <p>
            <button type="button" onClick={signIn}>
              Reddit Auth
            </button>
          </p>
          <p>
            <button
              type="button"
              onClick={() => setCount((count) => count + 1)}
            >
              count is: {count}
            </button>
          </p>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {" | "}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </header>
      </div>

      <Routes>
        <Route path="/" element={<div />} />
      </Routes>
    </>
  );
}

export default App;
