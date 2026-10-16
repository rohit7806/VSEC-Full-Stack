import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:5000/api/items";

function ReportItem() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ title: "", description: "", type: "Lost", location: "", contact: "" });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to register.");
      navigate("/items", { state: { message: "Player registered successfully!" } });
    } catch (error) {
      setMessage(error.message || "Unable to connect to backend.");
    }
  }

  return (
    <main className="card">
      <h2>Register Player Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Player Name</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. MS Dhoni" required />

        <label>Player Stats / Bio</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Batting style, bowling pace, recent scores..." required />

        <label>Primary Role</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Lost">Batsman</option>
          <option value="Found">Bowler / All-Rounder</option>
        </select>

        <label>Local Club / City</label>
        <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Nashik Gymkhana" required />

        <label>Contact Info</label>
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Phone or Email" required />

        <button type="submit">Submit Profile</button>
      </form>
      <p><Link to="/">Back to Dashboard</Link></p>
    </main>
  );
}

export default ReportItem;