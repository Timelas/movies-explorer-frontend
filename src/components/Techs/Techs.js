import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <h3 className='techs__text'>7 технологий</h3>
      <p className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs-navigation'>
          <li className='techs-navigation__item'>
            <a className='techs-navigation__text' href='https://developer.mozilla.org/ru/docs/Web/HTML' target='_blank' rel='noreferrer'>HTML</a>
          </li>
          <li className='techs-navigation__item'>
            <a className='techs-navigation__text' href='https://www.w3schools.com/css/' target='_blank' rel='noreferrer'>CSS</a>
          </li>
          <li className='techs-navigation__item'>
            <a className='techs-navigation__text' href='https://developer.mozilla.org/ru/docs/Web/JavaScript' target='_blank' rel='noreferrer'>JS</a>
          </li>
          <li className='techs-navigation__item'>
            <a className='techs-navigation__text' href='https://ru.react.js.org/' target='_blank' rel='noreferrer'>React</a>
          </li>
          <li className='techs-navigation__item'>
            <a className='techs-navigation__text' href='https://git-scm.com/' target='_blank' rel='noreferrer'>Git</a>
          </li>
          <li className='techs-navigation__item'>
            <a className='techs-navigation__text' href='https://expressjs.com/ru/' target='_blank' rel='noreferrer'>Express.js</a>
          </li>
          <li className='techs-navigation__item'>
            <a className='techs-navigation__text' href='https://www.mongodb.com/'>mongoDB</a>
          </li>
        </ul>
    </section>
  );
};

export default Techs;