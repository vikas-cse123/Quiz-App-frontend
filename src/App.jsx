import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import "./App.css";
const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Register />
    </div>
  );
};

export default App;
