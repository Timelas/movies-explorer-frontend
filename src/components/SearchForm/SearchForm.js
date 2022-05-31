import React from 'react';
import './SearchForm.css';
import FilterMovies from "../FilterMovies/FilterMovies";

function SearchForm({
  searchValue,
  setSearchValue,
  onSubmit,
  inputError,
  setInputError,
  isShortFilms,
  setIsShortFilms,
}) {
  return (
    <section className='search'>
      <div className='search__container'>
       <form className='search__form' onSubmit={onSubmit} noValidate>
          <div className='search__block'>
            <input className='search__input'
            type='search'
            name='keyWord'
            value={searchValue}
            id='search'
            onChange={(evt) => {setSearchValue(evt.target.value);}}
            placeholder='Фильм'
            autoComplete='off'
            minLength='1'
            maxLength='200'
            required
            onClick={() => setInputError("")}/>
            <button className='search__button' type='submit'>Найти</button>
          </div>
        </form>
        <FilterMovies
          filterText="Короткометражки"
          isShortFilms={isShortFilms}
          setIsShortFilms={setIsShortFilms}
        />
        <div className='search__line'></div>
      </div>
    </section>
  );
};

export default SearchForm;