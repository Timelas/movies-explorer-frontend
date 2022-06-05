import React, { useState } from "react";
import './SearchForm.css';
import FilterMovies from "../FilterMovies/FilterMovies";

function SearchForm(props) {
  const [findedMovie, setFindedMovie] = useState("");
  const [error, setError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  function handleSearchMovie(e) {
    setFindedMovie(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (findedMovie === "") {
      setError("Введите слово для поиска");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("");
      props.onGetMovies(findedMovie);
      setFindedMovie("");
    }
  }

  React.useEffect(() => {
    if (findedMovie && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [findedMovie, error]);

  return (
    <section className='search'>
      <div className='search__container'>
       <form className='search__form' onSubmit={handleSubmit} noValidate>
            <input className='search__input'
                type="text"
                name="search"
                placeholder="Фильм"
                minLength="2"
                maxLength="40"
                value={findedMovie}
                onChange={handleSearchMovie}
                required
            />
        </form>
        <button className='search__button' type='submit'
            onClick={handleSubmit}
            >Найти</button>
      </div>
      <div className="item-error">{error}</div>
      <div className="filter-movies">
        <FilterMovies
          onFilter={props.onFilter}
          isShortMovie={props.isShortMovie}
        />
      </div>
      <div className='search__line'></div>
    </section>
  );
};

export default SearchForm;