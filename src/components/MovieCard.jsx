import { Link } from "react-router-dom";

import { FaStar, FaHeart } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;

import PropTypes from 'prop-types';

import "./MovieCard.css";

const MovieCard = ({ movie, showLink = true, onAddToFavorites, favorites }) => {

  const handleAddToFavorites = () => {
    // Chama a função para adicionar aos favoritos
    onAddToFavorites(movie);
  };

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="movie-card">
      <img src={imagesURL + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        {isFavorite && ( // Renderiza o ícone do coração se for favorito
        <button
          className="favorites-button"
          onClick={handleAddToFavorites}
          disabled={isFavorite}
        >
          <FaHeart className="icon-favorite-cheio" /> Favoritado
        </button>
      )}
      {!isFavorite && ( // Renderiza o botão apenas se não for favorito
        <button
          className="favorites-button"
          onClick={handleAddToFavorites}
        >
          <FaHeart className="icon-favorite-vazio" /> Adicionar aos Favoritos
        </button>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  showLink: PropTypes.bool,
  onAddToFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
};

export default MovieCard;