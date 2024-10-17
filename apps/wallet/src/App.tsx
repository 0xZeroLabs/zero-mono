import "./App.css";
import { SendOtp } from "./components/SendOtp";

function App() {

  window?.postMessage(
    {
      type: "AUTH_OMID",
      value: 3000,
    },
    "*"
  );

  return (
    <>
      <SendOtp />
    </>
  );
}

export default App;
