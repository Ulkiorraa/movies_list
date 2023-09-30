import { useState, useEffect, useMemo } from "react";
import MovieCard from "../components/MovieCard";
import "./MoviesGrid.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
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
  const [totalPages, setTotalPages] = useState(1);
  const [topMovies, setTopMovies] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [title, setTitle] = useState("Melhores filmes");

  const getTopRatedMovies = async (page, genre) => {
    let url = `${moviesURL}top_rated?${apiKey}&language=pt-BR&page=${page}`;
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToSelectedPage = () => {
    if (selectedPage >= 1 && selectedPage <= totalPages) {
      setCurrentPage(selectedPage);
    }
  };

  // Atualiza o título quando o gênero selecionado muda
  useEffect(() => {
    if (selectedGenre) {
      const genreName = genres.find(
        (genre) => genre.id === parseInt(selectedGenre)
      )?.name;
      setTitle(`Favoritos: ${genreName}`);
    } else {
      setTitle("Favoritos");
    }
  }, [selectedGenre, genres]);

  useEffect(() => {
    // Chama a função getTopRatedMovies com a página atual e o gênero selecionado
    getTopRatedMovies(currentPage, selectedGenre);
    window.scrollTo(0, 0);
  }, [currentPage, selectedGenre]);

  return (
    <div className="container">
      <select
        className="genre-select"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">Todos os Gêneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <h2 className="title">{title}</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <div className="pagination">
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(parseInt(e.target.value))}
        >
          {/* Opções para todas as páginas disponíveis */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <option key={page} value={page}>
                Página {page}
              </option>
            )
          )}
        </select>
        <button className="pagination-button" onClick={goToSelectedPage}>
          Ir
        </button>
        <button
          className="pagination-button"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="page-indicator">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Home;