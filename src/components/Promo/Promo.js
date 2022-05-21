import React from 'react';
import Promoimg from '../../images/promoimg.svg'
import './Promo.css';

function Promo() {
  return (
    <div className='promo'>
    <div className='promo__section'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img className='promo__image' src={Promoimg} alt='логотип промо страницы' />
    </div>
    </div>
  );
};

export default Promo;