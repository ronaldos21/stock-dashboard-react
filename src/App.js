import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import { WatchlistProvider } from "./context/WatchlistContext";

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </WatchlistProvider>
  );
}

export default App;
