import React from "react";
import "./MoviesCard.css";
import { baseUrl } from "../../utils/config";

function MoviesCard(props) {
  const isLiked = !props.isSavedMovies && props.likedMovies(props.movie);

console.log(props);

  function handleLikeClick() {
    props.onAddMovie({
      country: props.movie.country,
      director: props.movie.director,
      duration: props.movie.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: `${baseUrl}${props.movie.image ? props.movie.image.url : ""}`,
      trailer: props.movie.trailerLink,
      thumbnail: `${baseUrl}${
        props.movie.image.formats.thumbnail
          ? props.movie.image.formats.thumbnail.url
          : ""
      }`,
      movieId: props.movie.id,
      nameRU: props.movie.nameRU,
      nameEN: props.movie.nameEN,
      isSaved: props.movie.isSaved,
    });
  }

  function handleDeleteClick() {
    props.onDelete(props.movie);
  }

  return (
    <section className="card">
      <div className="card__block">
      <a
         className="card__box"
        href={props.trailerLink || props.trailer}
        target="_blank"
         rel="noreferrer"
      >
        <img src={
            props.isSavedMovies
              ? props.movie.image
              : `${baseUrl}${
                  props.movie.image ? props.movie.image.url : props.image
                }`
          } alt={props.name} className="card__pic" />
      </a>
      <div className="card__info">
        <div>
          <h3 className="card__title">{props.name || props.movie.nameRU}</h3>
          <p className="card__duration">{`${Math.floor(
            (props.duration || props.movie.duration) / 60
          )}ч ${(props.duration || props.movie.duration) % 60}м`}</p>
        </div>
        {props.isSavedMovies ? (
          <div className="card__delete" onClick={handleDeleteClick} />
        ) : (
          <div
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            onClick={handleLikeClick}
          />
        )}
      </div>
      </div>
    </section>
  );
}

export default MoviesCard;