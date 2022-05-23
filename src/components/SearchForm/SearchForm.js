import React from 'react';
import './SearchForm.css';
import formValidation from '../../hooks/formValidation';

function SearchForm(props) {
  const [isShortMovie, setIsShortMovie] = React.useState(props.isShortMovieButton);
  const [isShowError, setIsShowError] = React.useState(false);

  function handlePick() {
    props.isShortMovie(!isShortMovie, props.isSaved);
    setIsShortMovie(!isShortMovie);
  }

  const {values, handleChange, errors, isValid} = formValidation({
    keyWord: '',
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (errors.keyWord) {
      setIsShowError(true);
      return
    } else {
      setIsShowError(false);
    }
    if (isValid) {
      props.handleSubmit(values.keyWord, props.isSaved);
    }
  }

  return (
    <section className='search'>
      <div className='search__container'>
       <form className='search__form' onSubmit={handleSubmit} noValidate>
          <div className='search__block'>
            <input className='search__input' type='text'name='keyWord'
                   value={values.keyWord || ''} id='search' onChange={handleChange} placeholder='Фильм'
                   autoComplete='off' minLength='1' maxLength='200' required/>
                               {isShowError ? (<p className='search__input_error'>Нужно ввести ключевое слово</p>) : null}
            <button className='search__button' type='submit'>Найти</button>
          </div>
        </form>
        <div className='search__toggle'>
          <div onClick={handlePick} className={`search__toggle-button ${!isShortMovie ? '' : '_isChoosenBackground'}`}>
            <div className={ `search__toggle-disk${isShortMovie ? '_isChoosenButton' : ''}`}/>
          </div>
          <p className='search__title'>Короткометражки</p>
        </div>
        <div className='search__line'></div>
      </div>
    </section>
  );
};

export default SearchForm;