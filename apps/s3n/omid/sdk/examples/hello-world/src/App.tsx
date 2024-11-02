import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OMIDInterface from "@0xzerolabs/sdk";

async function App() {
  const omid = new OMIDInterface("");
  const isAvailable = await omid.isAvailable();

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
        {isAvailable ? (
          <button onClick={() => omid.connect()}>connect to omid</button>
        ) : (
          <></>
        )}
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
