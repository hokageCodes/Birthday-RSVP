import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import './App.css'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      </Routes>
    </Router>
  );
}

export default App;