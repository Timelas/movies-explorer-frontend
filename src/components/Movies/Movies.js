import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <>
      <div>
        <section className='movies'>
          <Header />
          <SearchForm />
          <MoviesCardList />
          <More />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Movies;