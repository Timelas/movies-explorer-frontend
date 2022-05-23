import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import SavedMoviesCardList from './../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({isShortSavedMovieButton, isSearched, loggedIn, isLoading, handleSubmit, isShortMovie, savedMovies, deleteMovie }) {
  return (
    <>
      <div>
        <section className='save-movies'>
        <Header
          loggedIn={loggedIn} />
          <SearchForm
          isSaved={true}
          isShortMovieButton={isShortSavedMovieButton}
          cards={savedMovies}
          handleSubmit={handleSubmit}
          isShortMovie={isShortMovie} />
          <SavedMoviesCardList
          isSaved={true}
          isSearched={isSearched}
          cards={savedMovies}
          deleteMovie={deleteMovie} />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default SavedMovies;