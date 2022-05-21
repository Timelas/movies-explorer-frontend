import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <section className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__line'></div>
      <div className='footer__content'>
        <p className='footer__copyright'>&copy; 2022</p>
        <nav className='footer__links'>
            <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a>
            <a className='footer__link' href='https://github.com/Timelas' target='_blank' rel='noopener noreferrer'>Github</a>
            <a className='footer__link' href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>Facebook</a>
        </nav>
      </div>
    </section>
  );
};

export default Footer;