import { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to remove a favorite post
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h2>Favorite Posts</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id} className="fav-item">
              <a href={`https://www.reddit.com${fav.url}`} target="_blank" rel="noopener noreferrer">
                {fav.title}
              </a>
              <button onClick={() => removeFavorite(fav.id)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
