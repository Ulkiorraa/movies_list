export const getFavoritesFromLocalStorage = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites;
};

export const addToFavorites = (movie) => {
  const favorites = getFavoritesFromLocalStorage();

  // Verifique se o filme já está nos favoritos para evitar duplicatas
  if (!favorites.some((fav) => fav.id === movie.id)) {
    // Adicione o filme à lista de favoritos
    favorites.push(movie);

    // Atualize o localStorage com a lista de favoritos
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
