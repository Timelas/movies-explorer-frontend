import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './SavedMoviesCardList.css';
import '../More/More.css';
import { LargeWindowSize, MediumWindowSize, SmallWindowSize } from '../../utils/consts';

function SavedMoviesCardList(props) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  function moviesCount() {
    if (windowSize >= LargeWindowSize) return { count: 12, more: 3 };
    if (windowSize >= MediumWindowSize) return { count: 8, more: 2 };
    if (windowSize >= SmallWindowSize) return { count: 5, more: 1 };
  }

  const handler = useCallback(
    // eslint-disable-next-line func-names
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
    setFilteredMovies(props.cards.slice(0, (filteredMovies.length += moviesCount().more)));
  };

  return (
    <section className='movies-cardlist'>
      <section className='movies-cardlist__section'>
        {props.isSearched && props.cards.length === 0
          ? (<p className='cards__not-found'>Ничего не найдено</p>)
          :<ul className='cards__list'>
            {props?.cards?.reduce((filmsBatch, item) => {
              if (filmsBatch?.length < filteredMovies?.length) {
                filmsBatch.push(
                  <MoviesCard
                    card={item}
                    key={item._id}
                    deleteMovie={props.deleteMovie}
                    cards={props.cards}
                    isSaved={true} />);
              }
              return filmsBatch;
            }, [])}

          </ul>
        }

        <div className='more'>
          {props?.cards?.length > filteredMovies?.length
            ? (
              <button className='more__button'
                      onClick={onMoreButtonClick}
                      type='button'>
                Ещё
              </button>
            ) : null}
        </div>
      </section>
    </section>
  );
}

export default SavedMoviesCardList;