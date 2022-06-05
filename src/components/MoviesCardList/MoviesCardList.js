import React, { Suspense } from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import { MIN_NUMBER_OF_CARDS, MAX_NUMBER_OF_CARDS } from "../../utils/config";
const MoviesCard = React.lazy(() => import("../MoviesCard/MoviesCard")); // Ленивая загрузка

function MoviesCardList(props) {
  const [counter, setCounter] = React.useState(4);

  function showMoreMovies() {
    setCounter(counter + 4);
  }

  return (
    <>
      <section className="movieslist">
        <Suspense fallback={<Preloader />}>
          {props.message ? (
            <p className="movies-message">{props.message}</p>
          ) : (
            <section className='movieslist__section'>
              <ul className="movies__list">
                {props.movies
                  .slice(0, counter)
                    .map((movie, id) => (
                      <MoviesCard
                      movie={movie}
                      name={movie.nameRU}
                      duration={movie.duration}
                      key={id}
                      id={movie._id}
                      {...movie}
                      isSavedMovies={props.isSavedMovies}
                      onAddMovie={props.onAddMovie}
                      onDelete={props.onDelete}
                      savedMovies={props.savedMovies}
                      likedMovies={props.likedMovies}
                    />
                  ))}
              </ul>
            </section>
          )}
        </Suspense>
      </section>
      {props.movies.length >= MIN_NUMBER_OF_CARDS &&
      props.movies.length > counter &&
      props.movies.length <= MAX_NUMBER_OF_CARDS &&
      !props.message ? (
				<div className="movies__btn">
        <button
          className={`movies__button`}
          type="button"
          onClick={showMoreMovies}
        >
          Ещё
        </button>
        </div>
      ) : (
        ""
      )}
   </>
  );
}

export default MoviesCardList;