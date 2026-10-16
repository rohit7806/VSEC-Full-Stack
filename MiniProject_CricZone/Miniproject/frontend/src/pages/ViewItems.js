import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API = "http://localhost:5000/api/items";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  async function getItems(searchText = "") {
    try {
      const response = await fetch(`${API}?search=${encodeURIComponent(searchText)}`);
      if (!response.ok) throw new Error("Could not load players.");
      setItems(await response.json());
    } catch (error) {
      setMessage("Unable to connect to backend.");
    }
  }

  useEffect(() => { getItems(); }, []);
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  async function markReturned(id) {
    try {
      const response = await fetch(`${API}/${id}`, { method: "PATCH" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed.");
      await getItems(search);
      setMessage("Player marked as Drafted!");
    } catch (error) { setMessage(error.message); }
  }

  async function deleteItem(id) {
    if (!window.confirm("Remove this player profile?")) return;
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed.");
      await getItems(search);
      setMessage("Profile deleted.");
    } catch (error) { setMessage(error.message); }
  }

  return (
    <main className="card">
      <h2>Scout Roster</h2>
      {message && <p className="message">{message}</p>}
      <input value={search} onChange={(e) => { setSearch(e.target.value); getItems(e.target.value); }} placeholder="Search players..." style={{marginBottom: "20px"}}/>
      
      {items.length === 0 ? <p>No players listed yet.</p> : (
        items.map((item) => (
          <div className="item" key={item._id}>
            <h3>{item.title}</h3>
            <p><strong>Role:</strong> {item.type === "Lost" ? "Batsman" : "Bowler / All-Rounder"}</p>
            <p><strong>Stats:</strong> {item.description}</p>
            <p><strong>Club:</strong> {item.location}</p>
            <p><strong>Contact:</strong> {item.contact}</p>
            <p><strong>Draft Status:</strong> {item.status === "Open" ? "Free Agent" : "Signed"}</p>
            
            {item.status === "Open" && <button onClick={() => markReturned(item._id)}>Draft Player</button>}
            <button className="delete" onClick={() => deleteItem(item._id)}>Remove</button>
          </div>
        ))
      )}
      <br/>
      <Link className="button" to="/report">Register Another</Link>
      <p><Link to="/">Back to Dashboard</Link></p>
    </main>
  );
}

export default ViewItems;