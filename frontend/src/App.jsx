import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import './App.css'
import SimpleSlider from "./components/carousel/Carousel";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/hero" element={<SimpleSlider />} />
      </Routes>
    </Router>
  );
}

export default App;