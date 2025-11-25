import { Toaster } from "react-hot-toast";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import QuizSettings from "./components/quizSettings";
import Quiz from "./components/Quiz";
const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      {/* <Register /> */}
      {/* <Login/> */}
        <Header/>

      {/* <Home/> */}
      {/* <QuizSettings/> */}
      <Quiz/>
    </div>
  );
};

export default App;
