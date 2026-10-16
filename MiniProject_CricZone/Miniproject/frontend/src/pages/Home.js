import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="card home">
      <h2>Welcome to the CricZone Scouting Portal</h2>
      <p>Register as a local player looking for a club, or scout available talent for your upcoming tournament matches.</p>
      <Link className="button" to="/report">Register a Player</Link>
      <Link className="button" to="/items">Scout Available Players</Link>
    </main>
  );
}

export default Home;