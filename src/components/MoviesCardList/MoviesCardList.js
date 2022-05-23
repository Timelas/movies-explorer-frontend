import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import '../More/More.css';
import { LargeWindowSize, MediumWindowSize, SmallWindowSize } from '../../utils/consts';

function MoviesCardList(props) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  function moviesCount() {
    if (windowSize >= LargeWindowSize) return { count: 12, more: 3 };
    if (windowSize >= MediumWindowSize) return { count: 8, more: 2 };
    if (windowSize >= SmallWindowSize) return { count: 5, more: 1 };
  }

  const handler = useCallback(
    debounce(function () {
      setWindowSize(window.innerWidth);
    }, 500),
    []
  );

  const onChange = () => {
    handler();
  };

  useEffect(() => {
    const newMovies = props?.cards?.slice(0, moviesCount().count);
    setFilteredMovies(newMovies);
  }, [props.cards, windowSize]);

  useEffect(() => {
    window.addEventListener('resize', onChange);
    return () => {
      window.removeEventListener('resize', onChange);
    };
  }, []);

  const onMoreButtonClick = () => {
    setFilteredMovies(props?.cards?.slice(0, (filteredMovies.length += moviesCount().more)));
  };

  return (
    <section className='movieslist'>
        <section className='movieslist__section'>
        {props.isSearched && props.cards.length === 0 && !props.isLoading
          ? (<p className='cards__not-found'>Ничего не найдено</p>)
          : <ul className='cards__list'>
{props?.cards?.reduce((filmsBatch, item) => {
            if (filmsBatch?.length < filteredMovies?.length) {
              filmsBatch.push(
                <MoviesCard
                  handleSaveMovie={props.handleSaveMovie}
                  card={item}
                  key={item.id}
                  savedMovies={props.savedMovies}
                  deleteMovie={props.deleteMovie}
                  isSaved={props?.savedMovies?.some((card) => card.nameRU.toLowerCase() === item.nameRU.toLowerCase())}
                />
              );
            }
            return filmsBatch;
          }, [])}
        </ul>
     }
     <div className='more'>
          {props?.cards?.length > filteredMovies?.length
          ? (
            <button className='more__button' onClick={onMoreButtonClick} type='button'>
              Ещё
            </button>
          ) : null}
        </div>
          </section>
      </section>

  );
};

export default MoviesCardList;