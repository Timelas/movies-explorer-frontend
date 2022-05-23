import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import ExampleCard from '../../images/pic1.png';
import SavedMovieBtn from '../../images/saved-film_button.svg';
import SaveBtn from '../../images/saved-button.svg';
import RemoveSavedMovie from '../../images/delete-film_button.svg';

function MoviesCard(props) {
  let SavedMovie;
  const [isSaved, setIsSaved] = React.useState(false);
  const { pathname } = useLocation();
  SavedMovie = pathname === '/saved-movies';

  function handleSave() {
    setIsSaved(true);
  }

  function handleRemoveFromSaved() {
    setIsSaved(false);
  }

  return (
    <section className='moviecard'>
      <div className='moviecard__block'>
        <img className='moviecard__pic' src={ExampleCard} alt='Кадр из фильма 33 слова о дизайне' />
        <div className='moviecard__info'>
          <div>
            <h3 className='moviecard__title'>33 слова о дизайне</h3>
            <p className='moviecard__duration'>1ч 47м</p>
          </div>
          {SavedMovie ? (
            <button className='moviecard__button-delete' onClick={handleRemoveFromSaved}><img src={RemoveSavedMovie} alt='кнопка удаления сохраненного фильма'/></button>
            ) : (
            <>
                {isSaved ?
                  (
                    <button className='moviecard__button-saved'><img src={SavedMovieBtn} alt='фильм сохранен'/></button>
                  ) : (
                    <button className='moviecard__button' onClick={handleSave}><img src={SaveBtn} alt='кнопка сохранения фильма'/></button>
                  )
                }
              </>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default MoviesCard;