import React, { useState, useEffect } from "react";

const SearchSubreddit = ({ subreddit, setSubreddit }) => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    if (!subreddit) return;
    fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.children) {
          setPosts(data.data.children.map((post) => post.data));
        }
      })
      .catch((err) => console.error("Error Fetching Data:", err));
  }, [subreddit]);

  const toggleFavorite = (post) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === post.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== post.id);
    } else {
      updatedFavorites = [...favorites, { id: post.id, title: post.title, url: post.permalink }];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        placeholder="Enter subreddit"
        className="search-input"
      />
      <h2>Top Posts from r/{subreddit}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
            <button onClick={() => toggleFavorite(post)}>
              {favorites.some((fav) => fav.id === post.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSubreddit;