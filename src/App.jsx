import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchSubreddit from "./SearchSubreddit";
import Favorites from "./Favorites";
import "./App.css";

const App = () => {
  const [subreddit, setSubreddit] = useState("");

  return (
      <div className="container">
        <h1>Favorite Reddit Posts</h1>
        <nav>
          <Link to="/">Search</Link> | <Link to="/favorites">Favorites</Link>
        </nav>

        <Routes>
          {/* Home Page - Search Subreddit */}
          <Route path="/" element={<SearchSubreddit subreddit={subreddit} setSubreddit={setSubreddit} />} />
          
          {/* Favorites Page - Shows saved posts */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
  );
};

export default App;
