import { Toaster } from "react-hot-toast";
import "./App.css";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div>
      <Layout />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
