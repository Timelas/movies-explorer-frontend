import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  // const cards = props.cards || [];
  // const [cardsArray, setCardsArray] = React.useState(0);

  // const renderCards = React.useCallback(() => {
  //   setCardsArray(cards);
  // }, []);

  // React.useEffect(() => renderCards(), [renderCards]);

  return (
    <section className='movieslist'>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <section className='movieslist__section'>
          <ul className='cards__list'>
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
          </ul>
          </section>
      )}
      </section>

  );
};

export default MoviesCardList;