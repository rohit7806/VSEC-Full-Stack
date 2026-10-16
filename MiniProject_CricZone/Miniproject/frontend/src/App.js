import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ReportItem from "./pages/ReportItem";
import ViewItems from "./pages/ViewItems";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="cric-header">
        <div className="logo-left">[CricZone Logo]</div>
        <h2>CricZone Player Scout</h2>
        <div className="logo-right">[CSK Logo]</div>
      </header>
      <nav className="cric-nav">
        <Link to="/">Home</Link>
        <Link to="/report">Register Player</Link>
        <Link to="/items">Scout Players</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/items" element={<ViewItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;