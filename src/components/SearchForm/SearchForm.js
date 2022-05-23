import React from 'react';
import './SearchForm.css';

function SearchForm() {
  const [isPicked, setIsPicked] = React.useState(false);

  function handlePick() {
    setIsPicked(!isPicked);
  }

  return (
    <section className='search'>
      <div className='search__container'>
       <form className='search__form'>
          <div className='search__block'>
            <input className='search__input' type='text' placeholder='Фильм' autoComplete='off' minLength='2' maxLength='200' required/>
            <button className='search__button' type='submit'>Найти</button>
          </div>
        </form>
        <div className='search__toggle'>
          <div onClick={handlePick} className={'search__toggle-button'}>
            <div className={ `search__toggle-disk ${ isPicked ? 'search__toggle-disk_off' : '' }` }/>
          </div>
          <p className='search__title'>Короткометражки</p>
        </div>
        <div className='search__line'></div>
      </div>
    </section>
  );
};

export default SearchForm;