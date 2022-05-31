import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  renderMovie,
  handleMoreRenderMovie,
  movies,
  visibleMovie,
  setRenderMovie,
  countInitCards,
  addMovie,
  savedMovies,
  deleteMovie,
  setVisibilityButton,
  setVisibleMovie,
  visibilityButton,

}) {
  const { pathname } = useLocation();
  const [visibilityTextNotFound, setVisibilityTextNotFound] = React.useState("");

  React.useEffect(() => {
    const cards = countInitCards();

    if (pathname === "/saved-movies") {
      setVisibilityButton("movies__button_visibility");
      setVisibilityTextNotFound("movies__button_visibility");
    } else {
      setVisibilityTextNotFound("");
    }

    if (
      localStorage.getItem("foundFilms") &&
      JSON.parse(localStorage.getItem("foundFilms")).length > 0
    ) {
      setVisibleMovie("movies__visibility");
    }

    if (localStorage.getItem("foundFilms")) {
      setRenderMovie(
        JSON.parse(localStorage.getItem("foundFilms")).slice(0, cards)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, setRenderMovie, pathname]);

  function parseTimeFilm(parseMinute) {
    const hours = Math.floor(parseMinute / 60);
    const minutes = parseMinute % 60;
    const durationTime = `${hours}ч ${minutes}м`;
    return durationTime;
  }
  return (
    <section className={`movieslist ${visibleMovie}`}>
            {pathname === "/movies" && (renderMovie.length > 0 || savedMovies.length > 0) ?
        ''
      :
      <p>Not Found</p>
      }
<section className='movieslist__section'>
<ul className="movies__list">
        {pathname === "/movies"
          ? renderMovie.map((movie) => (
              <MoviesCard
                key={movie.id}
                cardName={movie.nameRU}
                timeDuration={parseTimeFilm(movie.duration)}
                imageLink={`https://api.nomoreparties.co${movie.image.url}`}
                trailerLink={movie.trailerLink}
                movie={movie}
                addMovie={addMovie}
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
              />
            ))
          : savedMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
                cardName={movie.nameRU}
                timeDuration={parseTimeFilm(movie.duration)}
                imageLink={`https://api.nomoreparties.co${movie.image.url}`}
                trailerLink={movie.trailerLink}
                addMovie={addMovie}
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
              />
            ))}
      </ul>
      {movies.length > renderMovie.length || pathname !== "/saved-movies" ? (
        <div className="movies__btn">
        <button
          className={`movies__button ${visibilityButton}`}
          type="button"
          onClick={handleMoreRenderMovie}
        >
          Ещё
        </button>
        </div>
      ) : (
        ""
      )}
    </section>
    </section>
  );
}

export default MoviesCardList;