import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const onClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        window?.postMessage(
          {
            type: "HELLO",
            value: "hello",
          },
          "*"
        );
      },
    });
  };

  window?.postMessage(
    {
      type: "AUTH_OMID",
      value: 3000,
    },
    "*"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventListener = (event: any) => {
    if (
      event.source === window &&
      event.data &&
      event.data.type === "AUTH_OMID"
    ) {
      window.removeEventListener("message", eventListener);
      setCount(event.data.value);
    }
  };
  window.addEventListener("load", () => {
    console.log(window);
    window.addEventListener("message", eventListener);
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            onClick();
          }}
          className="text-white"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
