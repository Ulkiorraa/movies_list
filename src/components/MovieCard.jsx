import { Link } from "react-router-dom";

import { FaStar, FaHeart } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;

import PropTypes from 'prop-types';

import "./MovieCard.css";

const MovieCard = ({ movie, showLink = true, onAddToFavorites }) => {
  return (
    <div className="movie-card">
      <img src={imagesURL + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        <button className="favorites-button" onClick={() => onAddToFavorites(movie)}>
        <FaHeart /> Adicionar aos Favoritos
      </button>
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
};

export default MovieCard;