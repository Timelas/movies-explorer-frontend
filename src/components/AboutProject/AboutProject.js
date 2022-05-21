import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project'>
        <h2 className='about-project__title'>О проекте</h2>
        <ul className='project-list'>
          <li className='project-list__item'>
            <h3 className='project-list__header'>Дипломный проект включал 5 этапов</h3>
            <p className='project-list__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className='project-list__item'>
            <h3 className='project-list__header'>На выполнение диплома ушло 5 недель</h3>
            <p className='project-list__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className='project-diagram'>
          <div className='project-diagram_color_green'>1 неделя</div>
          <div className='project-diagram_color_grey'>4 недели</div>
          <p className='project-diagram_type_text'>Back-end</p>
          <p className='project-diagram_type_text'>Front-end</p>
        </div>
    </section>
  );
};

export default AboutProject;