import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { listen, TauriEvent } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import pino from "pino";
import { createPortal } from "react-dom/client";

const logger = pino({
  browser: {
    serialize: true,
    asObject: true,
    write: {
      info: (o) => {
        const div = document.createElement("div");

        //@ts-ignore
        div.innerText = JSON.stringify(o, null, 2);

        document.body.appendChild(div);
      },
    },
  },
});

function App() {
  useEffect(() => {
    setInterval(() => {
      logger.info(window.visualViewport.height);
    }, 5000);
  }, []);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke("greet", {
      name: "tres",
    });
    invoke("download", {
      url: "tres",
    });
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input id="greet-input" placeholder="Enter a name..." />
        <button type="submit">Greet</button>
      </form>
    </div>
  );
}

export default App;
