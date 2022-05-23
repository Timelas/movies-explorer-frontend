import React from 'react';
import Arrow from '../../images/arrow.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <nav className='portfolio-links'>
            <a className='portfolio-link' href='https://github.com/Timelas/how-to-learn' target='_blank' rel='noreferrer'>
              <p className='portfolio-link__heading'>Статичный сайт</p>
              <img className='portfolio-link__image' src={Arrow} alt='стрелка' />
            </a>
            <a className='portfolio-link' href='https://timelas.github.io/russian-travel/index.html' target='_blank' rel='noreferrer'>
              <p className='portfolio-link__heading'>Адаптивный сайт</p>
              <img className='portfolio-link__image' src={Arrow} alt='стрелка' />
            </a>
            <a className='portfolio-link' href='https://github.com/Timelas/react-mesto-api-full' target='_blank' rel='noreferrer'>
              <p className='portfolio-link__heading'>Одностраничное приложение</p>
              <img className='portfolio-link__image' src={Arrow} alt='стрелка' />
            </a>
        </nav>
    </section>
  );
};

export default Portfolio;