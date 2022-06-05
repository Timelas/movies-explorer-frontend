import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return (
    <section className="save-movies">
      <Header bgColor="gray" textColor="white" loggedIn={props.loggedIn} />
      <SearchForm
        onGetMovies={props.onGetMovies}
        onFilter={props.onFilter}
        isShortMovie={props.isShortMovie} />
      {props.movies.length > 0 ? (
        <MoviesCardList
          isSavedMovies={props.isSavedMovies}
					movies={props.movies}
          onGetMovies={props.onGetMovies}
          onDelete={props.onDelete}
          message={props.message}
        />
      ) : (
        <p className="movies-message">У вас пока нет сохраненных фильмов</p>
      )}

      <Footer />
    </section>
  );
}

export default SavedMovies;