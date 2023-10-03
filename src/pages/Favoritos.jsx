import { useState, useMemo } from "react";
import MovieCard from "../components/MovieCard";
import SelectPage from "../components/selectPage";
import { FaArrowUp } from "react-icons/fa";
import "./MoviesGrid.css";

const Favoritos = () => {
  const genres = useMemo(
    () => [
      {
        id: 28,
        name: "Ação",
      },
      {
        id: 12,
        name: "Aventura",
      },
      {
        id: 16,
        name: "Animação",
      },
      {
        id: 35,
        name: "Comédia",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Família",
      },
      {
        id: 14,
        name: "Fantasia",
      },
      {
        id: 36,
        name: "História",
      },
      {
        id: 27,
        name: "Terror",
      },
      {
        id: 10402,
        name: "Música",
      },
      {
        id: 9648,
        name: "Mistério",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Ficção científica",
      },
      {
        id: 10770,
        name: "Cinema TV",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "Guerra",
      },
      {
        id: 37,
        name: "Faroeste",
      },
    ],
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Define quantos filmes por página
  const [selectedGenre, setSelectedGenre] = useState(""); // Defina o estado selectedGenre
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const addToFavorites = (movie) => {
    // Verifique se o filme já está nos favoritos para evitar duplicatas
    if (!favorites.some((fav) => fav.id === movie.id)) {
      // Adicione o filme à lista de favoritos no estado
      setFavorites([...favorites, movie]);

      // Atualize o localStorage com a lista de favoritos
      localStorage.setItem("favorites", JSON.stringify([...favorites, movie]));
    }
  };

  const sortedFavorites = [...favorites].sort((a, b) => b.vote_average - a.vote_average);

  // Aplica a seleção de gênero se algum gênero estiver selecionado
  const filteredFavorites = selectedGenre
    ? sortedFavorites.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
    : sortedFavorites;

  // Calcula o índice inicial e final dos filmes na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra os filmes a serem exibidos na página atual
  const moviesToShow = filteredFavorites.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1); // Redefine a página para a primeira quando o gênero muda
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para uma animação suave
    });
  };

  return (
    <div className="container">
      <h2 className="title">Filmes Favoritos (Ordenados por Maior Nota)</h2>
      <select
        className="genre-select"
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        <option value="">Todos os Gêneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <div className="movies-container">
        {moviesToShow.length === 0 ? (
          <p>Nenhum filme favorito encontrado.</p>
        ) : (
          moviesToShow.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
            />
          ))
        )}
      </div>
      <div className="pagination">
      <SelectPage
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(filteredFavorites.length / itemsPerPage)}
        pageText="Página "
        />
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="page-indicator">
          Página {currentPage} de {Math.ceil(filteredFavorites.length / itemsPerPage)}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredFavorites.length / itemsPerPage)}
        >
          Próxima
        </button>
      </div>
      <button className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    </div>
  );
};

export default Favoritos;