import { Toaster } from "react-hot-toast";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      {/* <Register /> */}
      <Login/>
    </div>
  );
};

export default App;
