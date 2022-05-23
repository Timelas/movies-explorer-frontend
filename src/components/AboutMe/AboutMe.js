import React from 'react';
import './AboutMe.css';
import MyPhoto from '../../images/myFoto.JPG';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__profile'>
          <h3 className='about-me__name'>Саша</h3>
          <p className='about-me__description'>Фронтенд-разработчик, 24 года</p>
          <p className='about-me__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt iaculis egestas. Praesent varius placerat justo et finibus. Nullam mi odio,
            sollicitudin non pretium a, tempus in orci. Nullam imperdiet ligula lorem, in volutpat urna varius id. Quisque risus elit, semper et elit ac, porttitor bibendum nisl.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sed turpis molestie, pulvinar ex et, rhoncus lacus.</p>
          <nav className='about-me__links'>
            <a className='about-me__link' href='https://www.facebook.com' target='_blank' rel='noreferrer'>Facebook</a>
            <a className='about-me__link' href='https://github.com/Timelas' target='_blank' rel='noreferrer'>GitHub</a>
          </nav>
        <img className='about-me__image' src={MyPhoto} alt='мое фото'/>
      </div>
    </section>
  );
};

export default AboutMe;