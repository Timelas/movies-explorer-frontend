// import React from "react";
// import { useLocation } from "react-router-dom";
// import "./MoviesCard.css";
// import selectedMovie from "../../images/saved-film_button.svg";
// import unselectedMovie from "../../images/unsaved-film_button.png";
// import deleteIcon from "../../images/delete-film_button.svg";
// import userCurrentContext from "../../contexts/CurrentUserContext";

// function MoviesCard({
//   movie,
//   cardName,
//   timeDuration,
//   imageLink,
//   trailerLink,
//   addMovie,
//   savedMovies,
//   deleteMovie,
// }) {
//   const { pathname } = useLocation();
//   const [isSavedMovie, setIsSavedMovie] = React.useState(false);
//   const movieIcon = isSavedMovie ? selectedMovie : unselectedMovie;
//   const cardIcon = pathname === "/movies" ? movieIcon : deleteIcon;
//   const currentUser = React.useContext(userCurrentContext);

//   function handleLikeMovie() {
//     if (!isSavedMovie) {
//       addMovie(movie);
//       setIsSavedMovie(true);
//     } else {
//       const movieItem = savedMovies.filter(
//         (savedMovie) => savedMovie.movieId === movie.id
//       );
//       deleteMovie(movieItem[0]._id);
//       setIsSavedMovie(false);
//     }
//   }

//   function handleDeleteButton() {
//     deleteMovie(movie._id);
//   }

//   React.useEffect(() => {
//     if (savedMovies.length > 0) {
//       if (!isSavedMovie) {
//         setIsSavedMovie(
//           savedMovies.some(
//             (savedMovie) =>
//               savedMovie.movieId === movie.id &&
//               savedMovie.owner === currentUser._id
//           )
//         );
//       }
//     } else {
//       setIsSavedMovie(false);
//     }
//   }, [currentUser._id, isSavedMovie, movie.id, savedMovies]);

//   const MovieDeleteOrAddIcon =
//     pathname === "/movies" ? handleLikeMovie : handleDeleteButton;

//   return (
//     <section className="card">
//     <div className="card__block">
//     <a
//         className="card__box"
//         href={trailerLink}
//         target="_blank"
//         rel="noreferrer"
//       >
//         <img src={imageLink} alt="testPic" className="card__pic" />
//       </a>
//       <div className="card__info">
//         <div>
//           <h3 className="card__title">{cardName}</h3>
//           <p className="card__duration">{timeDuration}</p>
//         </div>
//         <img
//           src={cardIcon}
//           alt=""
//           className="card__button"
//           onClick={MovieDeleteOrAddIcon}
//         />
//       </div>
//     </div>
//     </section>
//   );
// }

// export default MoviesCard;

import React from "react";
import { baseUrl } from "../../utils/config";

function MoviesCard(props) {
  const isLiked = !props.isSavedMovies && props.likedMovies(props.movie);

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
    <div className="card">
      <div className="card__description">
        <ul className="card__description-container">
          <li className="card__title">{props.name || props.movie.nameRU}</li>
          <li className="card__duration">{`${Math.floor(
            (props.duration || props.movie.duration) / 60
          )}ч ${(props.duration || props.movie.duration) % 60}м`}</li>
        </ul>
        {props.isSavedMovies ? (
          <div className="card__delete" onClick={handleDeleteClick} />
        ) : (
          <div
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            onClick={handleLikeClick}
          />
        )}
      </div>
      <a
        href={props.trailerLink || props.trailer}
        target="_blank"
        rel="noopener noreferrer nofollow
  "
      >
        <img
          className="card__img"
          alt={props.name}
          src={
            props.isSavedMovies
              ? props.movie.image
              : `${baseUrl}${
                  props.movie.image ? props.movie.image.url : props.image
                }`
          }
        />
      </a>
    </div>
  );
}

export default MoviesCard;