import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { FaArrowUp } from "react-icons/fa";
import { getFavoritesFromLocalStorage, addToFavorites } from "../components/FavoriteUpdate";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [favorites] = useState(getFavoritesFromLocalStorage());

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const goToSelectedPage = () => {
      if (selectedPage >= 1 && selectedPage <= totalPages) {
        setCurrentPage(selectedPage);
      }
    };
    goToSelectedPage();
  }, [selectedPage, totalPages]);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  const getSearchedMovies = async (url) => {
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.statusText}`);
      }
  
      const contentType = res.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        const data = await res.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } else {
        console.error("A resposta da API não é JSON.");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&page=${currentPage}`;
    getSearchedMovies(searchWithQueryURL);
    window.scrollTo(0, 0);
  }, [query, currentPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para uma animação suave
    });
  };

  useEffect(() => {
    // Chama a função getTopRatedMovies com a página atual e o gênero selecionado
    getSearchedMovies(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
            />
          ))}
      </div>
      <div className="pagination">
        <span>Ir para a página:</span>
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
      <button className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    </div>
  );
};

export default Search;
