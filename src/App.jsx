import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/home/Homepage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
