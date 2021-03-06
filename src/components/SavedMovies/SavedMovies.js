import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
      <div>
        <section className='save-movies'>
          <Header />
          <SearchForm />
          <MoviesCardList />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default SavedMovies;