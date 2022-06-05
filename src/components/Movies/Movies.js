/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props) {

  return (
    <section className="movies">
      <Header bgColor="gray" textColor="white" loggedIn={props.loggedIn} />
      <SearchForm
        onGetMovies={props.onGetMovies}
        onFilter={props.onFilter}
        isShortMovie={props.isShortMovie} />
      <MoviesCardList
        movies={props.movies}
        onGetMovies={props.handleGetMovies}
        onAddMovie={props.onAddMovie}
        isSavedMovies={false}
        message={props.message}
        savedMovies={props.savedMovies}
        likedMovies={props.likedMovies}
      />
      <Footer />
    </section>
  );
}

export default Movies;