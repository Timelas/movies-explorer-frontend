import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import selectedMovie from "../../images/saved-film_button.svg";
import unselectedMovie from "../../images/unsaved-film_button.png";
import deleteIcon from "../../images/delete-film_button.svg";
import userCurrentContext from "../../contexts/CurrentUserContext";

function MoviesCard({
  movie,
  cardName,
  timeDuration,
  imageLink,
  trailerLink,
  addMovie,
  savedMovies,
  deleteMovie,
}) {
  const { pathname } = useLocation();
  const [isSavedMovie, setIsSavedMovie] = React.useState(false);
  const movieIcon = isSavedMovie ? selectedMovie : unselectedMovie;
  const cardIcon = pathname === "/movies" ? movieIcon : deleteIcon;
  const currentUser = React.useContext(userCurrentContext);

  function handleLikeMovie() {
    if (!isSavedMovie) {
      addMovie(movie);
      setIsSavedMovie(true);
    } else {
      const movieItem = savedMovies.filter(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      deleteMovie(movieItem[0]._id);
      setIsSavedMovie(false);
    }
  }

  function handleDeleteButton() {
    deleteMovie(movie._id);
  }

  React.useEffect(() => {
    if (savedMovies.length > 0) {
      if (!isSavedMovie) {
        setIsSavedMovie(
          savedMovies.some(
            (savedMovie) =>
              savedMovie.movieId === movie.id &&
              savedMovie.owner === currentUser._id
          )
        );
      }
    } else {
      setIsSavedMovie(false);
    }
  }, [currentUser._id, isSavedMovie, movie.id, savedMovies]);

  const MovieDeleteOrAddIcon =
    pathname === "/movies" ? handleLikeMovie : handleDeleteButton;

  return (
    <section className="card">
    <div className="card__block">
    <a
        className="card__box"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img src={imageLink} alt="testPic" className="card__pic" />
      </a>
      <div className="card__info">
        <div>
          <h3 className="card__title">{cardName}</h3>
          <p className="card__duration">{timeDuration}</p>
        </div>
        <img
          src={cardIcon}
          alt=""
          className="card__button"
          onClick={MovieDeleteOrAddIcon}
        />
      </div>
    </div>
    </section>
  );
}

export default MoviesCard;